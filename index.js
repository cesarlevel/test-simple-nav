document.addEventListener('DOMContentLoaded', function() {
    var stepsHistory = [];
    var steps = document.querySelectorAll('.step');
    var btnContinue = document.querySelectorAll('.continue');
    var btnGoBack = document.querySelectorAll('.go-back');

    function renderSteps() {
        steps.forEach(displayActive);
        function displayActive(step) {
            if (step.classList.contains('active')) {
                step.style.display = 'block';
            } else {
                step.style.display = 'none';
            }
        }
    }

    function clearStepsActiveClass() {
        steps.forEach(removeActiveClass);
        function removeActiveClass(step) {
            step.classList.remove('active');
        }
    }

    function nextStep(evt) {
        var el = evt.target;
        clearStepsActiveClass();
        stepsHistory.push(el.parentNode.dataset.step);
        document.querySelector(`section[data-step="${el.dataset.nextStep}"]`)
            .classList.toggle('active');
        renderSteps();
        evt.preventDefault();
    }

    function goBack(evt) {
        var el = evt.target;
        clearStepsActiveClass();
        document.querySelector(`section[data-step="${stepsHistory.pop()}"]`)
            .classList.toggle('active');
        renderSteps();
        evt.preventDefault();
    }

    btnContinue.forEach(item => item.addEventListener('click', nextStep));
    btnGoBack.forEach(item => item.addEventListener('click', goBack));

    renderSteps();
});
