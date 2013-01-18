function demoTilePersistentPanel() {

$demo.append(
    "Click for a full-page ",
    Link.create({
        content: "side-panel demo",
        href: "/catalog/PersistentPanel/persistentPanelSideDemo.html",
        target: "_blank"
    }),
    " or ",
    Link.create({
        content: "toolbar demo",
        href: "/catalog/PersistentPanel/persistentPanelToolbarDemo.html",
        target: "_blank"
    }),
    "."
);

}
