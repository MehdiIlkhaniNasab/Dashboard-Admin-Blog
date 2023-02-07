const {font} = ClassicEditor

ClassicEditor.create(document.querySelector('#editor'))
    .then(editor => {
    })
    .catch(error => {
        console.error(error);
    });