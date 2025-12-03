package api

import (
	"encoding/csv"
	"encoding/json"
	"log"
	"net/http"
	"net/mail"
	"os"
	//goMail "github.com/wneessen/go-mail" // need more info to implement
)

type WaitlistedCustomer struct {
	Email string
}

func post(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var customer WaitlistedCustomer
	err := json.NewDecoder(r.Body).Decode(&customer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// verify email
	_, err = mail.ParseAddress(customer.Email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// waitlist.csv exists?
	_, err = os.Stat("content/waitlist.csv")
	existed := !os.IsNotExist(err)

	// open waitlist.csv for editing
	file, err := os.OpenFile("content/waitlist.csv", os.O_CREATE|os.O_APPEND|os.O_RDWR, 0644)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer func(file *os.File) {
		_ = file.Close()
	}(file)

	csvWriter := csv.NewWriter(file)
	defer csvWriter.Flush()

	// add header "Email" if "waitlist.csv" has just been created new (which is unlikely, so can be removed idk)
	if !existed {
		if err := csvWriter.Write([]string{"Email"}); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	// from this point onward, {customer.Email} must be valid,
	// might need to check if the email actually exists on its respective email server

	// handle duplicated emails
	csvReader := csv.NewReader(file)
	records, err := csvReader.ReadAll()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	for _, email := range records {
		if email[0] == customer.Email {
			http.Error(w, "Already subscribed", http.StatusConflict)
			return
		}
	}

	// write to "waitlist.csv" and panic on failure
	err = csvWriter.Write([]string{customer.Email})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// send a confirmation email, need more info to implement
	// mail := goMail.NewMsg()
	// mail.From("")

	log.Printf("%s has been added to the waitlist", customer.Email)
	w.WriteHeader(http.StatusOK)
}

func init() {
	router.HandleFunc("POST /api/waitlist", post)
	log.Println("INIT /api/waitlist")
}
