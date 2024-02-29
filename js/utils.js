export default function initUtils(canvas) {
    let trashBtn = document.getElementsByClassName("trash-btn")[0];
    trashBtn.onclick = function () {
        if (canvas.getActiveObject()) {
            canvas.remove(canvas.getActiveObject());
            canvas.renderAll();
        }
    }

    let undoBtn = document.getElementsByClassName("undo")[0];
    undoBtn.onclick = function () {
        canvas.undo();
    }

    let redoBtn = document.getElementsByClassName("redo")[0];
    redoBtn.onclick = function () {
        canvas.redo();
    }

    document.addEventListener('keyup', function (event) {
        let { key, ctrlKey } = event;

        if (key === "Delete") {
            let obj = canvas.getActiveObject();
            if (obj && !obj.isEditing) {
                canvas.remove(obj);
            }
        }

        if (!ctrlKey) {
            return
        }

        // Check pressed button is Z - Ctrl+Z.
        if (key === "z" || key === "Z") {
            canvas.undo()
        }

        // Check pressed button is Y - Ctrl+Y.
        if (key === "y" || key === "Y") {
            canvas.redo()
        }
    })
}