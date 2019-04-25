$(function () {

    var $form = $('.js-randomForm');
    var $startButton = $('.btn-start');    
    var $inputsContainer = $('.js-inputsContainer');
    var $formContainer = $('.js-randomFormContainer');
	var StartMilliseconds = 0;

	
	function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
	};


    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

	
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    function getRandom(cases) {
        return (Math.random() * 1000).toFixed(0) % cases;
    }

    function updateLabelPositions(position) {

        var $labels = $('.js-randomForm label');

        switch (position) {
            case 0: {
                $labels.css('text-align', 'left');
                break;
            }        
            case 1: {
                $labels.css('text-align', 'center');
                break;
            }    
            case 2: {
                $labels.css('text-align', 'right');
                break;
            }                
        }
    }

    var map = {};

    function renderForm() {

        $inputsContainer.html('');

        var inputs = shuffleArray(['Company Name', 'Role in Company', 'First Name', 'Last Name', 'Address', 'Email', 'Phone Number', 'Password']);
		

        var useBr = getRandom(2);

        var $firstDiv = $('<div></div>');

        $firstDiv.css('text-align', 'center');

        

        var $secondDiv = $firstDiv.clone();

        var shouldCenterInputs = getRandom(2) === 1;
        var shouldMakeLabelsInline = getRandom(2) === 1;

        if (getRandom(2) && $(window).width() > 1200) {

            $firstDiv.css('display', 'inline-block');   
            $secondDiv.css('display', 'inline-block');

            if (shouldMakeLabelsInline) {
                // $firstDiv.css('min-width', '600px');
            } else {
                $firstDiv.css('min-width', '380px');
            }

            if (shouldMakeLabelsInline) {          
                $firstDiv.css('vertical-align', 'top');
                $secondDiv.css('vertical-align', 'top');
                $firstDiv.css('width', '500px');
                $secondDiv.css('width', '500px');
            } else {
                $firstDiv.css('margin', "10px");
                $firstDiv.css('min-width', '380px');
            }            
        }

        if (shouldMakeLabelsInline) {
            console.log('inline!');
        }

        for (var idx in inputs) {

            var key = inputs[idx];
            var hash = makeid();

            map[hash] = key;

			//get language
			var lang = getParameterByName('lang');
			
			if (lang == 'Jap') 
			{
				switch (key) {
					case 'Company Name':
						key = '会社名';
						break;
					case 'Role in Company':
						key = '役職';
						break;
					case 'First Name':
						key = '名前';
						break;
					case 'Last Name':
						key = '姓';
						break;
					case 'Address':
						key = '住所';
						break;
					case 'Email':
						key = 'Eメール';
						break;
					case 'Phone Number':
                        key = '電話番号';
                    case 'Password':
                        key = '暗証';
				}

			}
			
			
			
            var $label = $('<label>' + key + '</label>');
            var $input = $('<input class="form-control" type="text" name="' + hash + '" id="' + hash + '"/>');
            var $inputGroup = $('<div class="js-inputContainer input-group"></div>');

            if (shouldMakeLabelsInline) {

                var $table = $('<div class="inline-input-container"></div>');

                $inputGroup.append($label);
                $inputGroup.append($input);
                $table.append($inputGroup);

                if (getRandom(2)) {
                    $firstDiv.append($table);
                } else {
                    $secondDiv.append($table);
                }

            } else {

                if (shouldCenterInputs) {
                    $inputGroup.addClass('input-group-centered');
                }
                
                var $br = $('<br/>');

                $inputGroup.append($label);

                if (useBr) {
                    $inputGroup.append($br.clone());
                }

                $inputGroup.append($input);

                if (getRandom(2)) {
                    $firstDiv.append($inputGroup);
                } else {
                    $secondDiv.append($inputGroup);
                }
            } 
        }

        $inputsContainer.prepend($firstDiv);
        $inputsContainer.prepend($secondDiv);

        if (!shouldMakeLabelsInline) {
            updateLabelPositions(getRandom(3));
        }
    };

    renderForm();

    var currentStepIndex = 0;
    var score = 0;
    var totalSteps = 0;

    var isChallengeStarted = false;

    $startButton.on('click', function () {

        if (isChallengeStarted) {
            return;
        }

        isChallengeStarted = true;

        renderForm();

        $startButton.addClass('disabled');
	
	    //add start time
	    StartMilliseconds = new Date().getTime();

        $startButton.text('Round ' + (currentStepIndex + 1));
    });

    $form.on('submit', function (e) {

        e.preventDefault();

        if (!isChallengeStarted) {

            renderForm(currentStepIndex);

            return;
        }

        var formValue = $form.serializeArray();

        var currentStep = window.dataSteps.steps[currentStepIndex];

        for (var idx in formValue) {

            totalSteps++;

            var currentInput = formValue[idx];

            if (currentStep[map[currentInput.name]] == currentInput.value) {
                score++;
            }
        }

        var isLastStep = currentStepIndex == window.dataSteps.steps.length - 1;
		//only 3 tries
		//var isLastStep = currentStepIndex == 2; 
		
		
        if (isLastStep) {

            var percentage = (score / totalSteps * 100).toFixed(2);

			var EndMilliseconds = new Date().getTime() - StartMilliseconds;
			
            var successMessage = 'Your success rate is ' + percentage + '% (' + score + ' out of ' + totalSteps + ' fields) in '+ EndMilliseconds +' milliseconds';

            $('.success-score').text(successMessage);

            $form.remove();

            $('.success-container').show();

            $startButton.text('Finished');

        } else {

            currentStepIndex++;

            $startButton.text('Round ' + (currentStepIndex + 1));
            
            renderForm(currentStepIndex);
        }
    });

});