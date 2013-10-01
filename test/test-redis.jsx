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
}
