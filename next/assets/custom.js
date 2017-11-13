document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        var modules = ["IndexedTables", "Base", "JuliaDB", "Base.Sort"];
        document.querySelectorAll(".docstring-binding")
            .forEach(function (x) {
                var c = x.children[0], s = c.textContent;
                for (var i=0, l=modules.length; i<l; i++) {
                    var m = modules[i];
                    if (s.startsWith(m + ".")) {
                        c.textContent = s.substr(m.length+1, s.length-m.length);
                    }
                }
            });
    }
}
