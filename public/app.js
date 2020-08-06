document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal1');
    const instance = M.Modal.init(modal, {});
    instance.open();

});

const modalButton = document.querySelector(".howToUseModalButton");

modalButton.addEventListener('click', function() {
const modal2 = document.querySelector('.modal2');
const instance2 = M.Modal.init(modal2, {});
instance2.open();

});