export class Input {
    constructor(options) {
        const {
            name,
            placeholder,
            label,
            type = 'text',
            onInput,
            onChange,
        } = options;

        this.input = document.createElement('input');
        this.errorMassage = document.createElement('span');

        this.name = name;
        this.input.name = name,
        this.input.type = type,
        this.input.placeholder = placeholder,
        this.label = label,
        this.value = this.input.value;

        this.control = this.createControl(onInput, onChange);
    }

    createControl(onInput, onChange){
        const container = document.createElement('div');
        const label = document.createElement('label');

        const inputId = `_${this.name}`;

        container.classList.add('text-control');
        this.errorMassage.classList.add('errorMassage');
        this.input.classList.add('input');

        this.input.id = inputId;
        label.setAttribute('for', inputId);

        label.innerText = this.label;

        container.append(label, this.input, this.errorMassage)

        this.input.addEventListener("input", (event) => {
            this.value = event.target.value;
            this.updateErrorMassage('')
            if (onInput) {
                onInput(event);
            }
        });
        
      
        if (onChange) {
            this.input.addEventListener("change", (event) => {
              onChange(event);
            });
        }
      
        return container;
    }

    updateErrorMassage (massage) {
        this.errorMassage.innerText = massage;
    }

    render(container) {
        container.append(this.control)
    }

}