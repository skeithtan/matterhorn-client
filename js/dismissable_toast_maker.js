import iziToast from "izitoast";

//Creates and shows an info iziToast, returning a function that dismisses it
function makeInfoToast(settings) {
    const uuid = makeUUID();
    settings.id = uuid;
    settings.timeout = false;
    iziToast.info(settings);

    const toast = document.getElementById(uuid);

    return function () {
        iziToast.hide(toast, {
            transitionOut : "fadeOut",
        });
    };
}

function makeErrorToast(settings) {
    const uuid = makeUUID();
    settings.id = uuid;
    settings.timeout = false;
    iziToast.error(settings);

    const toast = document.getElementById(uuid);

    return function () {
        iziToast.hide(toast, {
            transitionOut : "fadeOut",
        });
    };
}


function makeUUID() {
    // Random string with very little collision possibility
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16),
    );
}

export {
    makeInfoToast,
    makeErrorToast,
};