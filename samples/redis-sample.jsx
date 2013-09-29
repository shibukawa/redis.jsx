import "console.jsx";
import "redis.jsx";

class _Main {
    static function main(argv : string[]) : void
    {
        var client = redis.createClient();
        client.mset(["testkey", "testvalue", "testkey2", "testvalue2"], function (err : Error) : void {
            if (err)
            {
                console.log(err);
            }
            else
            {
                client.mget(["testkey", "testkey2"], function (err : Error, ret : string[]) : void {
                    console.log("Return from redis:", ret);
                    client.end();
                });
            }
        });
    }
}
