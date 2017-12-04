import Mousetrap from "mousetrap";


Mousetrap.bind(["command+p", "ctrl+p"], () => {
    window.print();
});