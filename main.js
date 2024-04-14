const form = document.getElementById('tax_form');
const inputs = form.querySelectorAll('.input_box');
const errorIcons = form.querySelectorAll('.error_icon');
const Info = {};
const tooltips = document.querySelectorAll('.hover_cls');
const submit_box = document.querySelector('.submit_box');
// Function to create and manage tooltips

window.onload = function() {
    inputs.forEach(input => {
        input.value = ''; // Set value to empty string
    });
};



function addTooltip(element, content) {
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip');
    tooltipElement.textContent = content;
    element.appendChild(tooltipElement);

    element.addEventListener('mouseover', () => {
        tooltipElement.style.display = 'block';
        // tooltipElement.style.zIndex = '10';
    });

    element.addEventListener('mouseout', () => {
        tooltipElement.style.display = 'none';
    });
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}

console.log(isNumeric('1') == true);


tooltips.forEach(tooltip => {
    const content = tooltip.getAttribute('data-tooltip');
    addTooltip(tooltip, content);
});

errorIcons.forEach(errIcon => {
    const content = errIcon.getAttribute('err_message');
    addTooltip(errIcon, content);
});

// Function to show/hide error messages
function toggleErrorMessage(errorIcon, show) {
    errorIcon.style.display = show ? 'inline-block' : 'none';
}

function validateInput(input, errorIcon) {
    if (!isNumeric(input.value)) {
        toggleErrorMessage(errorIcon, true);
        return false;
    } else {
        toggleErrorMessage(errorIcon, false);
        return true;
    }
}


for (let i = 0; i < inputs.length - 1; i++) {
    const errorIcon = errorIcons[i];
    if (i == 2) {
        inputs[i + 1].addEventListener('change', (e) => {
            if (validateInput(inputs[i + 1], errorIcon)) {
                Info[inputs[i + 1].name] = e.target.value;
            }
        })
    }
    else {
        inputs[i].addEventListener('change', (e) => {
            if (validateInput(inputs[i], errorIcon)) {
                Info[inputs[i].name] = e.target.value;
            }
        })
    }
}

inputs[2].addEventListener('change', (e) => {
    Info[inputs[2].name] = e.target.value;
})


function form_validation() {
    for (let i = 0; i < inputs.length - 1; i++) {
        if(i!=2)
        {
            const errorIcon = errorIcons[i];
            if (!validateInput(inputs[i], errorIcon)) {
                return true;
            }
        }
        else{
            const errorIcon = errorIcons[i];
            if (!validateInput(inputs[i+1], errorIcon)) {
                return true;
            }
        }
    }
    return false;
}

calculate = (Info) =>{
    // console.log(Info[inputs[0].name]);
    const result = parseInt(Info[inputs[0].name]) + parseInt(Info[inputs[1].name]) - parseInt(Info[inputs[3].name]);
    console.log(result);
    let overall_income = 0;
    if(result<=8)
    {
        overall_income = result;
    }
    else
    {
        if(Info[inputs[2].name]<40)
        {
            overall_income = result - 0.3*result;
        }
        else if(Info[inputs[2].name]>=40 && Info[inputs[2].name]<60 )
        {
            overall_income = result - 0.4*result;
        }
        else
        {
            overall_income = result - 0.1*result;
        }
    }

    console.log(overall_income);
    content = `Your overall income will be ${overall_income} after tax deductions`;

    const submit_text = document.createElement('div');
    submit_text.classList.add('submit_text_box');
    submit_box.appendChild(submit_text);
    const submit_text_in = document.createElement('div');
    submit_text_in.classList.add('submit_text_in');
    submit_text_in.textContent = content;
    submit_text.appendChild(submit_text_in);
    

    const closeButtonDiv = document.createElement('div');
    closeButtonDiv.classList.add('close_button');
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButtonDiv.appendChild(closeButton);
    submit_box.appendChild(closeButtonDiv);
    submit_box.style.display = 'flex';
    submit_box.style.flexDirection = 'column';
    submit_box.style.justifyContent = 'center';
    submit_box.style.alignItems = 'center';
    inputs.forEach(input => {
        input.value = '';
    });
    closeButton.addEventListener('click', function() {
        submit_box.style.display = 'none';
        submit_text.remove();
        closeButtonDiv.remove();
    });
}


form.addEventListener('submit', (event) => {
    let hasError = false;
    hasError = form_validation();
    if (hasError) {
        event.preventDefault();
        alert('Please fix the errors before submitting.');
    }
    else{
        event.preventDefault();
        console.log(Info);
        calculate(Info);
    }
});




