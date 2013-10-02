import "console.jsx";
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var msg_count = 0;
        var client1 = redis.createClient();
        var client2 = redis.createClient();

        client1.on("subscribe", (channel : string, count : int) -> {
            console.log("client1 subscribed to", channel, ",", count, "total subscriptions");
            if (count == 2) {
                client2.publish("a nice channel", "I am sending a message.");
                client2.publish("another one", "I am sending a second message.");
                client2.publish("a nice channel", "I am sending my last message.");
            }
        });

        client1.on("unsubscribe", (channel : string, count : int) -> {
            console.log("client1 unsubscribed from", channel, ",", count, "total subscriptions");
            if (count == 0) {
                client2.end();
                client1.end();
            }
        });

        client1.on("message", (channel : string, message : string) -> {
            console.log("client1 channel", channel, ":", message);
            msg_count += 1;
            if (msg_count == 3) {
                client1.unsubscribe();
            }
        });

        client1.on("ready", ()-> {
            // if you need auth, do it here
            client1.incr("did a thing");
            client1.subscribe(["a nice channel", "another one"]);
        });

        client2.on("ready", ()-> {
            // if you need auth, do it here
        });
    }
}
