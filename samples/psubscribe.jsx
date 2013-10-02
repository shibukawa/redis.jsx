import "console.jsx";
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var msg_count = 0;
        var client1 = redis.createClient();
        var client2 = redis.createClient();
        var client3 = redis.createClient();
        var client4 = redis.createClient();

        redis.debug_mode = false;

        client1.on("psubscribe", (pattern : string, count : int) -> {
            console.log("client1 psubscribed to", pattern + ",", count, "total subscriptions");
            client2.publish("channeltwo", "Me!");
            client3.publish("channelthree", "Me too!");
            client4.publish("channelfour", "And me too!");
        });

        client1.on("punsubscribe", (pattern : string, count : int) -> {
            console.log("client1 punsubscribed from ", pattern + ",", count, "total subscriptions");
            client4.end();
            client3.end();
            client2.end();
            client1.end();
        });

        client1.on("pmessage", (pattern, channel, message) -> {
            console.log("("+  pattern as string +")", "client1 received message on", channel, ":", message);
            msg_count += 1;
            if (msg_count == 3) {
                client1.punsubscribe();
            }
        });

        client1.psubscribe("channel*");
    }
}
