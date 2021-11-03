const MODAL = (() =>{
    let _successHandler;
    let _cancelHandler;

    let _modal = document.querySelector(".modal")
    const _TITLE = _modal.querySelector("header h1")
    const _FORM = _modal.querySelector("form")
    const _BUTTON_CANCEL = _modal.querySelector("button[name=cancel]")
    const _BUTTON_SUBMIT = _modal.querySelector("button[name=submit]")
    const _CLASS_OPEN = "--openned"
    const _INPUTS = _modal.querySelectorAll("input")

    _BUTTON_CANCEL.onclick = close

    Array.from(_INPUTS).forEach(input => {
        input.onchange = () => input.setCustomValidity("")
    })

    _FORM.onsubmit = (event) => {
        event.preventDefault()

        try {
            submit()
            _FORM.reset()
        }
        catch (error) {
            const invalidInputs = JSON.parse(error.message)

            Array.from(_INPUTS).forEach(input => {
                if(invalidInputs[input.name]){
                    input.setCustomValidity(invalidInputs[input.name])
                }
            })
            _FORM.reportValidity()
        }
    }

    function open(settings){
        _successHandler = settings.success
        _cancelHandler = settings.fail
        _BUTTON_SUBMIT.innerHTML = settings.labelButtonSubmit
        _TITLE.innerHTML = settings.title

        if (settings.initialValues){
            initInputs(settings.initialValues)

        }
        _modal.classList.add(_CLASS_OPEN)
    }

    function close(){
        _modal.classList.remove(_CLASS_OPEN)
    }

    function cancel(){
        close()
        return _cancelHandler()
    }

    function submit(){
        const inputValues = Array.from(_INPUTS).reduce((data, input) => {
            data[input.name] = input.value
            return data
        }, {})
        _successHandler(inputValues)
        close()
    }

    function initInputs(inputValues){
        Array.from(_INPUTS).forEach(input => input.value = inputValues[input.name])
    }

    return{
        open,
        close,
        cancel,
        submit,
    }

})()
