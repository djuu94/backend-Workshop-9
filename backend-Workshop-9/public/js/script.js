document.addEventListener('DOMContentLoaded', function() {
    var closeFlashButton = document.querySelector('span.close-flash');
    if(closeFlashButton){
        closeFlashButton.addEventListener('click',closeFlashMessage)
    }

    const completeStepCheckboxes = document.querySelectorAll('.complete-step');
    if(completeStepCheckboxes){
        completeStepCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', completeStep)
        })
    }
    calculateAllProgress()
  })


  const closeFlashMessage = (ev) => {
    const flashMessage = ev.target.parentNode;
    flashMessage.remove();
  }

  const completeStep = async (ev) => {
    const checkbox = ev.target;
    const stepId = ev.target.dataset.stepId;
    const pathId = ev.target.dataset.pathId;
    const done = checkbox.dataset.done === "true";


    const response = await fetch('/api/profile/complete-step', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stepId, pathId, done: !done})
    })
    if(response.ok){
        checkbox.dataset.done = !done;
    }
  }
  const calculateAllProgress = () => {
    const paths = document.querySelectorAll('.path');
    if(paths){
        paths.forEach(path => {
            calculateProgress(path)
        })
    }
  }
  const calculateProgress = (el) => {
    const steps = el.querySelectorAll('.complete-step');
    const totalSteps = steps.length;
    const completedSteps = el.querySelectorAll('.complete-step[data-done="true"]').length;

    const progress =  el.querySelector('.progress-bar');
    progress.style.width = `${completedSteps / totalSteps * 100}%`;

    const stepsCount = el.querySelector('.steps-count');
    stepsCount.innerText = `${completedSteps} / ${totalSteps} steps completed`;

    const progressPercent = el.querySelector('.progress-percent');
    progressPercent.innerText = `${Math.round(completedSteps / totalSteps * 100)}%`;
  }