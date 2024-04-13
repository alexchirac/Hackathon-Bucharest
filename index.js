class Button {
    constructor() {
        this.value = 0;
        this.valueElement = document.getElementById('value');
        this.updateBtn = document.getElementById('updateBtn');
        this.updateBtn.addEventListener('click', this.updateValue.bind(this));
        this.updateValue();
    }

    updateValue() {
        this.value++;
        this.valueElement.textContent = this.value;
        console.log("merge cv");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    new Button();
});