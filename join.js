var test;

function join(id) {

    test = PeerObject(id)
        .joinObject((d) => {
            let messagesDom = "";
            console.log(d);
            for (let i of d.message) {
                messagesDom += "<li>" + i + "</li>"
            }
            document.getElementById("objectId").innerHTML = messagesDom;
        });

    setTimeout(() => {
        test.store.message = [];
        document.getElementById("objectId").innerHTML = test.groupId;
    }, 1000);

}

function onSubmit(e) {
    console.log(e);
    join(document.getElementById("objectIdInput").value);
}


function onSubmitMessage(e) {
    if (test) {
        let message = document.getElementById("messageInput").value;

        test.store.message.push(message);
        document.getElementById("messageInput").value = "";
    }
}