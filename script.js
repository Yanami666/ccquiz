const questions = [
    {
      q: "1. How often do you feel overwhelmed by school tasks？",
      options: ["Never", "Sometimes", "Often", "Always"],
      score: [0, 1, 2, 3]
    },
    {
      q: "2. Do you have trouble sleeping because of stress?",
      options: ["Never", "Rarely", "Often", "Every night"],
      score: [0, 1, 2, 3]
    },
    {
      q: "3. How lonely do you feel living in NYC?",
      options: ["Not at all", "A little", "Quite a bit", "Very"],
      score: [0, 1, 2, 3]
    },
    {
      q: "4. How often do you talk to friends or family about your feelings?",
      options: ["Daily", "Weekly", "Monthly", "Almost never"],
      score: [0, 1, 2, 3]
    },
    {
      q: "5. How often do you feel emotionally drained?",
      options: ["Never", "Sometimes", "Often", "Every day"],
      score: [0, 1, 2, 3]
    },
    {
      q: "6. Do you enjoy your current living situation?",
      options: ["Yes", "It's okay", "Not really", "Hate it"],
      score: [0, 1, 2, 3]
    },
    {
      q: "7. How often do you cry or feel like crying?",
      options: ["Never", "Once a week", "Few times a week", "Every day"],
      score: [0, 1, 2, 3]
    },
    {
      q: "8. Do you feel hopeful about the future?",
      options: ["Yes!", "Maybe", "Not really", "Not at all"],
      score: [0, 1, 2, 3]
    }
  ];
  
  let current = 0;
  let totalScore = 0;
  
  function loadQuestion() {
    const q = questions[current];
    document.getElementById("question-title").innerText = q.q;
  
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
  
    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.innerText = opt;
      btn.className = "option-button";
      btn.onclick = () => {
        totalScore += q.score[i];
        localStorage.setItem(`q${current + 1}`, opt);
        nextQuestion();
      };
      optionsDiv.appendChild(btn);
    });
  
    updateProgress();
  }
  
  function nextQuestion() {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }
  
  function updateProgress() {
    let percent = (current / questions.length) * 100;
    document.getElementById("progress-fill").style.width = percent + "%";
  

    const progressText = document.getElementById("progress-text");
    progressText.innerText = `${current + 1} / ${questions.length}`;
  }
  
  function showResult() {
    document.getElementById("question-title").style.display = "none";
    document.getElementById("options").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("progress-bar").style.display = "none";
    document.getElementById("progress-text").style.display = "none";
  
    let resultText = "";
    let suggestion = "";
  
    if (totalScore <= 8) {
      resultText = "Congrats! Low stress. Keep taking care of yourself!";
      suggestion = "Try journaling, going outside more, and resting well.";
    } else if (totalScore <= 15) {
      resultText = "Moderate stress. Take breaks and talk to someone.";
      suggestion = "Try breathing exercises, calling a friend, or doing light exercise.";
    } else {
      resultText = "🔴 High stress. Please reach out for support.";
      suggestion = "Talk to a counselor, set boundaries, or talk to close friends to get some help!.";
    }
  
    document.getElementById("result-text").innerText = resultText;
    document.getElementById("suggestion-text").innerText = suggestion;
    document.getElementById("result-page").style.display = "block";
  }
  
  window.onload = function () {
    loadQuestion();
  };