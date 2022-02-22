import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

const mqtt = require('mqtt');
const Chat = () => {
    const [connectStatus, setConnectStatus] = useState(false)
    const [client, setClient] = useState(mqtt.connect('mqtt://localhost:8000/mqtt'));
    const [newMessage, setNewMessage] = useState('')
    const [recivedMessage, setRecivedMessage] = useState(" ")
    const [allMessages, setAllMessages] = useState([])
    const [room, setRoom] = useState("pokoj")
    useEffect(() => {

        if (!connectStatus) {
            setClient(mqtt.connect('mqtt://localhost:8000/mqtt'))
            setConnectStatus(true)
            console.log("Yey connected")

        }
    }, [])


    useEffect(() => {
        if (client) {
            console.log(client)
            client.on('connect', () => {
                setConnectStatus('Connected');

            });
            client.on('error', (err) => {
                console.error("connection error", err);
                client.end()
            });
            client.on('reconnect', () => {
                setConnectStatus('reconecting')
            });
            client.on('message', (topic, message) => {
                const Message = message.toString();
                setRecivedMessage(Message)
            })
        }

    }, [client])

    client.subscribe(room)

    useEffect(() => {
        setAllMessages(messages => [...messages, recivedMessage])
    }, [recivedMessage])


    const sendNewMessage = (e) => {
        client.publish(room, newMessage)
        setNewMessage('')
        e.preventDefault();

    }

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }




    return (
        <div className='Chat'>
            <div className="ChatTitle">Czat</div>
            {allMessages && allMessages.map(msg => <div className='Msg'>{msg}</div>)}
            <h3><form onSubmit={sendNewMessage} >
                <label className="ChatForm">
                    <div className="InputAndSend">
                        <div className='Input'> <input type="text" value={newMessage} onChange={handleChange} /></div>
                        <button type="submit" value="Send" />
                    </div>


                </label>

            </form> </h3>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.users.currentlyLoged,
    };
}



export default connect(mapStateToProps, null)(Chat)