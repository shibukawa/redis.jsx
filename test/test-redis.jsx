import "console.jsx";
import "test-case.jsx";
import "redis.jsx";

class _Test extends TestCase
{
    function test_get_exists() : void
    {
        var client = redis.createClient();
        this.async((async) -> {
            client.set('test_key', 'test_value');
            client.exists('test_key', (err, exists) -> {
                this.expect(exists).toBe(1);
            });
            client.get('test_key', (err, value) -> {
                this.expect(value).toBe('test_value');
                client.end();
                async.done();
            });
        }, 1000);
    }

    function test_mget_mset() : void
    {
        var client = redis.createClient();
        this.async((async) -> {
            client.mset(["test_key2", "testvalue", "test_key2", "testvalue2"], function (err : Error) : void {
                if (err)
                {
                    console.log(err);
                }
                else
                {
                    client.mget(["testkey", "testkey2"], function (err : Error, ret : string[]) : void {
                        this.expect(ret[0]).toBe('testvalue');
                        this.expect(ret[1]).toBe('testvalue2');
                        client.end();
                        async.done();
                    });
                }
            });
        }, 1000);
    }

    function test_del() : void
    {
        var client = redis.createClient();
        this.async((async) -> {
            client.set('test_key', 'test_value');
            client.del('test_key');
            client.exists('test_key', (err, exists) -> {
                this.expect(exists).toBe(0);
                client.end();
                async.done();
            });
        }, 1000);
    }

    function test_incr_decr() : void
    {
        var client = redis.createClient();
        this.async((async) -> {
            client.set('incr_test_key', '10');
            client.incr('incr_test_key', (err, value) -> {
                this.expect(value).toBe(11);
            });
            client.decr('incr_test_key', (err, value) -> {
                this.expect(value).toBe(10);
            });
            client.incrby('incr_test_key', 10, (err, value) -> {
                this.expect(value).toBe(20);
            });
            client.decrby('incr_test_key', 5, (err, value) -> {
                this.expect(value).toBe(15);
            });
            client.incrbyfloat('incr_test_key', 0.5, (err, value) -> {
                this.expect(value).toBe("15.5");
                client.end();
                async.done();
            });
        }, 1000);
    }

    function test_hash() : void
    {
        var client = redis.createClient();
        this.async((async) -> {
            client.hset('hash_test_key', 'member1', 'value1');
            client.hset('hash_test_key', 'member2', 'value2');
            client.hmset('hash_test_key', {member3 : 'value3', member4 : 'value4'});
            client.hlen('hash_test_key', (err, length) -> {
                this.expect(length).toBe(4);
            });
            client.hget('hash_test_key', 'member3', (err, value) -> {
                this.expect(value).toBe('value3');
            });
            client.hmget('hash_test_key', ['member1', 'member2'], (err, values) -> {
                this.expect(values[0]).toBe('value1');
                this.expect(values[1]).toBe('value2');
            });
            client.hkeys('hash_test_key', (err, keys) -> {
                this.expect(keys.length).toBe(4);
                client.end();
                async.done();
            });
        }, 1000);
    }
}
