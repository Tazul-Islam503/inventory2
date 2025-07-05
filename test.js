// আপনার Google Apps Script Web App URL টি এখানে পেস্ট করুন
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbypeHv_fDKrJPyEyajvb7yz5SI19LPlhxSZjxAAwSUoBgcFmf6U0IodgWgj9tdOphck/exec"; 

// আপনার ডেটা যা আপনি পাঠাতে চাচ্ছেন (একাধিক রো সহ 2D অ্যারে)
const myData = [
    [10, "karley", 4320],
    [20, "babu", 2300]
];

/**
 * গুগল শিটে একাধিক ডেটা রো POST করার ফাংশন
 * @param {Array<Array<any>>} data - 2D অ্যারে ফরম্যাটে ডেটা, যেখানে প্রতিটি সাব-অ্যারে একটি রো।
 */
async function postMultipleRowsToGoogleSheet(data) {
    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            // 'no-cors' মোড সরিয়ে দিন
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // ডেটা JSON স্ট্রিং হিসাবে পাঠান
        });

        // সার্ভার থেকে আসা JSON রেসপন্স পার্স করুন
        const result = await response.json(); 
        
        if (response.ok) { // HTTP স্থিতি কোড 200-299 এর মধ্যে হলে
            console.log("সার্ভার রেসপন্স:", result);
            alert("ডেটা পাঠানোর অনুরোধ সফল: " + result.message);
        } else {
            console.error("সার্ভার ত্রুটি:", result);
            alert("ডেটা পাঠাতে সমস্যা হয়েছে: " + result.message);
        }

    } catch (error) {
        console.error("নেটওয়ার্ক বা অন্যান্য ত্রুটি:", error);
        alert("ডেটা পাঠাতে নেটওয়ার্ক বা অন্যান্য সমস্যা হয়েছে: " + error.message);
    }
}

// আপনি যখন ডেটা পাঠাতে চান তখন এই ফাংশনটি কল করুন।
document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendMultipleRowsButton');
    if (sendButton) {
        sendButton.addEventListener('click', () => {
            postMultipleRowsToGoogleSheet(myData);
        });
    }
});
