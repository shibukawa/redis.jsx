import "console.jsx";
import "js/nodejs.jsx";
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var redis_client = redis.createClient();

        node.http.createServer((request, response) -> {
            response.writeHead(200, {
                "Content-Type": "text/plain"
            });
            
            var redis_info = [] : string[];
            var total_requests = 0;
            
            redis_client.info((err, reply) -> {
                redis_info = reply; // stash response in outer scope
            });
            redis_client.incr("requests", (err, reply) -> {
                total_requests = reply; // stash response in outer scope
            });
            redis_client.hincrby("ip", (request as variant)['connection']['remoteAddress'] as string, 1);
            redis_client.hgetall("ip", (err, reply) -> {
                // This is the last reply, so all of the previous replies must have completed already
                response.write("This page was generated after talking to redis.\n\n" +
                    "Redis info:\n" + redis_info.toString() + "\n" +
                    "Total requests: " + total_requests + "\n\n" +
                    "IP count: \n", 'utf8');
                for (var ip in reply)
                {
                    if (reply.hasOwnProperty(ip))
                    {
                        response.write("    " + ip + ": " + reply[ip] + "\n", 'utf8');
                    }
                }
                response.end();
            });
        }).listen(8080);
    }
}
