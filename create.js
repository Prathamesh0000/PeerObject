var test = PeerObject()
            .createObject((d) => {
                let messagesDom = "";
                console.log(d);
                for(let i of d.message) {
                    messagesDom += "<li>" + i +"</li>"
                }
                document.getElementById("objectId").innerHTML = messagesDom;
            });


setTimeout(() => {
    document.getElementById("objectId").innerHTML = test.groupId;
}, 1000);

function onSubmitMessage (e) {
    if(test) {
        let message = document.getElementById("messageInput").value;
        
        test.store.message.push(message);
        document.getElementById("messageInput").value = "";
    }
}