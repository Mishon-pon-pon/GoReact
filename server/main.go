package main

import (
	"net/http"
	"text/template"
)

func main() {
	http.Handle("/web/static/", http.StripPrefix("/web/static/", http.FileServer(http.Dir("./web/static/"))))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tmp, err := template.ParseFiles("./web/static/index.html")
		if err != nil {
			panic(err)
		}

		tmp.Execute(w, nil)
	})

	http.ListenAndServe(":8080", nil)
}
