document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
    M.Modal.init(document.getElementById('modal1'), {});
});