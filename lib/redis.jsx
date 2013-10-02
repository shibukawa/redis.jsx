/**
 * JSX wrapper for Redis node.js driver
 *
 * @author shibukawa
 *
 * @see git://github.com/shibukawa/redis.jsx.git
 */

import "js/nodejs.jsx";

native class redis
{
    static var debug_mode : boolean;
    static function createClient() : RedisClient;
    static function createClient(port : Nullable.<int>) : RedisClient;
    static function createClient(port : Nullable.<int>, host : Nullable.<string>) : RedisClient;
    static function createClient(port : Nullable.<int>, host : Nullable.<string>, options : Map.<variant>) : RedisClient;

    static function print(err : Error, ret : int) : void;
    static function print(err : Error, ret : string) : void;
    static function print(err : Error, ret : string[]) : void;
    static function print(err : Error, ret : variant[]) : void;
} = '''
require('redis');

(function () {
var RedisClient = require('redis').RedisClient;
var twoWordsCommands = [
    'script exists', 'script kill', 'script flush', 'script load',
    'client kill', 'client list', 'client getname', 'client setname',
    'config get', 'config rewrite', 'config set', 'config resetstat',
    'debug object', 'debug segfault',
    'object refcount', 'object encoding', 'object idletime',
    'pubsub channels', 'pubsub numsub', 'pubsub numpat'];

twoWordsCommands.forEach(function (command) {
    var words = command.split(' ');
    var lowerCaseCommand = words.join('');
    RedisClient.prototype[lowerCaseCommand] = function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(words[1]);
        return this.send_command(words[0], args);
    };
});

var overrideCommands = [
    'del', 'subscribe', 'psubscribe', 'unsubscribe', 'punsubscribe'
];

function flatten(args) {
    var finalArgs = [];
    for (var i = 0; i < args.length; i++)
    {
        var arg = args[i];
        if (Array.isArray(arg))
        {
            finalArgs = finalArgs.concat(arg);
        }
        else
        {
            finalArgs.push(arg);
        }
    }
    return finalArgs;
}

overrideCommands.forEach(function (command) {
    RedisClient.prototype[command] = function () {
        var args = flatten(Array.prototype.slice.call(arguments));
        args.unshift(command);
        return this.send_command(command, args);
    };
});

})();
''';

native __fake__ class RedisClient
{
    var port : int;
    var host : string;

    /**
     * "ready", "connect", "error", "end", "drain", "idle" events are supported.
     */
    function on(event : string, listener : () -> void) : void;
    /**
     * "error" events are supported.
     */
    function on(event : string, listener : (Error) -> void) : void;
    /**
     * "reconnecting" events are supported.
     */
    function on(event : string, listener : (Map.<int>) -> void) : void;
    /**
     * "monitor" event is supported.
     */
    function on(event : string, listener : (int, string[]) -> void) : void;
    /**
     * "subscribe", "psubscribe", "unsubscribe", "punsubscribe" vents are supported.
     */
    function on(event : string, listener : (string, int) -> void) : void;
    /**
     * "message" event is supported.
     */
    function on(event : string, listener : (string, string) -> void) : void;
    /**
     * "pmessage" event is supported.
     */
    function on(event : string, listener : (string, string, string) -> void) : void;

    function end() : void;

    function auth(password : string, callback : (Error) -> void) : void;
    function auth(password : string, callback : (Error, string) -> void) : void;

    function multi() : RedisTransaction;
    function multi(commands : string[][]) : RedisTransaction;

    function bgrewriteaof() : void;
    function bgrewriteaof(callback : (Error) -> void) : void;
    function bgrewriteaof(callback : (Error, string) -> void) : void;

    function bgsave() : void;
    function bgsave(callback : (Error) -> void) : void;
    function bgsave(callback : (Error, string) -> void) : void;

    function bitcount(key : string) : void;
    function bitcount(key : string, callback : (Error) -> void) : void;
    function bitcount(key : string, callback : (Error, int) -> void) : void;
    function bitcount(key : string, start : int) : void;
    function bitcount(key : string, start : int, callback : (Error) -> void) : void;
    function bitcount(key : string, start : int, callback : (Error, int) -> void) : void;
    function bitcount(key : string, start : int, end : int) : void;
    function bitcount(key : string, start : int, end : int, callback : (Error) -> void) : void;
    function bitcount(key : string, start : int, end : int, callback : (Error, int) -> void) : void;

    function bitop(operation : string, destkey : string, srckey : string, callback : (Error, int) -> void) : void;
    function bitop(operation : string, destkey : string, srckey : string[]) : void;
    function bitop(operation : string, destkey : string, srckey : string[], callback : (Error) -> void) : void;
    function bitop(operation : string, destkey : string, srckey : string[], callback : (Error, int) -> void) : void;

    function blpop(key : string, timeout : int, callback : (Error, string[]) -> void) : void;
    function blpop(keys : string[], timeout : int, callback : (Error, string[]) -> void) : void;

    function brpop(key : string, timeout : int, callback : (Error, string[]) -> void) : void;
    function brpop(keys : string[], timeout : int, callback : (Error, string[]) -> void) : void;

    function brpoplpush(source : string, destination : string, timeout : int, callback : (Error, string[]) -> void) : void;

    function clientgetname(callback : (Error, string) -> void) : void;

    function clientkill(ip_port : string) : void;
    function clientkill(ip_port : string, callback : (Error) -> void) : void;
    function clientkill(ip_port : string, callback : (Error, int) -> void) : void;

    function clientlist(callback : (Error, string[]) -> void) : void;

    function clientsetname(connectionname : string) : void;
    function clientsetname(connectionname : string, callback : (Error) -> void) : void;
    function clientsetname(connectionname : string, callback : (Error, int) -> void) : void;

    function configget(parameter : string, callback : (Error, string[]) -> void) : void;

    function configresetstat() : void;
    function configresetstat(callback : (Error) -> void) : void;
    function configresetstat(callback : (Error, string) -> void) : void;

    function configrewrite() : void;
    function configrewrite(callback : (Error) -> void) : void;
    function configrewrite(callback : (Error, string) -> void) : void;

    function configset(parameter : string, value : int) : void;
    function configset(parameter : string, value : int, callback : (Error) -> void) : void;
    function configset(parameter : string, value : int, callback : (Error, int) -> void) : void;
    function configset(parameter : string, value : string) : void;
    function configset(parameter : string, value : string, callback : (Error) -> void) : void;
    function configset(parameter : string, value : string, callback : (Error, int) -> void) : void;

    function dbsize(callback : (Error, int) -> void) : void;

    function decr(key : string) : void;
    function decr(key : string, callback : (Error) -> void) : void;
    function decr(key : string, callback : (Error, int) -> void) : void;

    function decrby(key : string, decrement : int) : void;
    function decrby(key : string, decrement : int, callback : (Error) -> void) : void;
    function decrby(key : string, decrement : int, callback : (Error, int) -> void) : void;

    function del(key : string) : void;
    function del(key : string, callback : (Error) -> void) : void;
    function del(key : string, callback : (Error, int) -> void) : void;
    function del(keys : string[]) : void;
    function del(keys : string[], callback : (Error) -> void) : void;
    function del(keys : string[], callback : (Error, int) -> void) : void;

    function dump(key : string, callback : (Error, string) -> void) : void;

    function echo(message : string) : void;
    function echo(message : string, callback : (Error) -> void) : void;
    function echo(message : string, callback : (Error, string) -> void) : void;

    function eval(script : string, numkeys : int) : void;
    function eval(script : string, numkeys : int, callback : (Error) -> void) : void;
    function eval(script : string, numkeys : int, callback : (Error, variant) -> void) : void;
    function eval(script : string, numkeys : int, callback : (Error, int) -> void) : void;
    function eval(script : string, numkeys : int, callback : (Error, string) -> void) : void;
    function eval(script : string, numkeys : int, callback : (Error, int[]) -> void) : void;
    function eval(script : string, numkeys : int, callback : (Error, string[]) -> void) : void;
    function eval(script : string, numkeys : int, keys_or_args : string[]) : void;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error) -> void) : void;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, variant) -> void) : void;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, int) -> void) : void;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, string) -> void) : void;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, int[]) -> void) : void;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, string[]) -> void) : void;
    function eval(script : string, numkeys : int, keys : string[], args : string[]) : void;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error) -> void) : void;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, variant) -> void) : void;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, int) -> void) : void;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, string) -> void) : void;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, int[]) -> void) : void;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, string[]) -> void) : void;

    function evalsha(sha1 : string, numkeys : int) : void;
    function evalsha(sha1 : string, numkeys : int, callback : (Error) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, variant) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, int) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, string) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, int[]) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, string[]) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[]) : void;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, variant) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, int) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, string) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, int[]) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, string[]) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[]) : void;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, variant) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, int) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, string) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, int[]) -> void) : void;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, string[]) -> void) : void;

    //function exec() : void;

    function exists(key : string, callback : (Error, int) -> void) : void;

    function expire(key : string, seconds : int, value : string) : void;
    function expire(key : string, seconds : int, value : string, callback : (Error) -> void) : void;
    function expire(key : string, seconds : int, value : string, callback : (Error, int) -> void) : void;

    function expireat(key : string, timestamp : int, value : string) : void;
    function expireat(key : string, timestamp : int, value : string, callback : (Error) -> void) : void;
    function expireat(key : string, timestamp : int, value : string, callback : (Error, int) -> void) : void;

    function flushall() : void;
    function flushall(callback : (Error) -> void) : void;
    function flushall(callback : (Error, string) -> void) : void;

    function flushdb() : void;
    function flushdb(callback : (Error) -> void) : void;
    function flushdb(callback : (Error, string) -> void) : void;

    function get(key : string, callback : (Error, string) -> void) : void;

    function getbit(key : string, offset : int, callback : (Error, int) -> void) : void;

    function getrange(key : string, start : int, end : int, callback : (Error, string) -> void) : void;

    function getset(key : string, value : string, callback : (Error, string) -> void) : void;

    function hdel(key : string, field : string) : void;
    function hdel(key : string, field : string, callback : (Error) -> void) : void;
    function hdel(key : string, field : string, callback : (Error, int) -> void) : void;
    function hdel(key : string, fields : string[]) : void;
    function hdel(key : string, fields : string[], callback : (Error) -> void) : void;
    function hdel(key : string, fields : string[], callback : (Error, int) -> void) : void;

    function hexists(key : string, field : string) : void;
    function hexists(key : string, field : string, callback : (Error) -> void) : void;
    function hexists(key : string, field : string, callback : (Error, int) -> void) : void;

    function hget(key : string, field : string, callback : (Error, Nullable.<string>) -> void) : void;

    function hgetall(key : string, callback : (Error, string[]) -> void) : void;

    function hincrby(key : string, field : string, increment : int) : void;
    function hincrby(key : string, field : string, increment : int, callback : (Error) -> void) : void;
    function hincrby(key : string, field : string, increment : int, callback : (Error, int) -> void) : void;

    function hincrbyfloat(key : string, field : string, increment : number) : void;
    function hincrbyfloat(key : string, field : string, increment : number, callback : (Error) -> void) : void;
    function hincrbyfloat(key : string, field : string, increment : number, callback : (Error, string) -> void) : void;

    function hkeys(key : string, callback : (Error, string[]) -> void) : void;

    function hlen(key : string, callback : (Error, int) -> void) : void;

    function hmget(keys : string, field : string[], callback : (Error, string[]) -> void) : void;

    function hmset(hash : string, obj : string[]) : void;
    function hmset(hash : string, obj : string[], callback : (Error) -> void) : void;
    function hmset(hash : string, obj : string[], callback : (Error, string) -> void) : void;
    function hmset(hash : string, obj : Map.<string>) : void;
    function hmset(hash : string, obj : Map.<string>, callback : (Error) -> void) : void;
    function hmset(hash : string, obj : Map.<string>, callback : (Error, string) -> void) : void;

    function hset(key : string, field : string, value : string) : void;
    function hset(key : string, field : string, value : string, callback : (Error) -> void) : void;
    function hset(key : string, field : string, value : string, callback : (Error, int) -> void) : void;

    function hsetnx(key : string, field : string, value : string) : void;
    function hsetnx(key : string, field : string, value : string, callback : (Error) -> void) : void;
    function hsetnx(key : string, field : string, value : string, callback : (Error, int) -> void) : void;

    function hvals(key : string, callback : (Error, string[]) -> void) : void;

    function incr(key : string) : void;
    function incr(key : string, callback : (Error) -> void) : void;
    function incr(key : string, callback : (Error, int) -> void) : void;

    function incrby(key : string, increment : int) : void;
    function incrby(key : string, increment : int, callback : (Error) -> void) : void;
    function incrby(key : string, increment : int, callback : (Error, int) -> void) : void;

    function incrbyfloat(key : string, increment : number) : void;
    function incrbyfloat(key : string, increment : number, callback : (Error) -> void) : void;
    function incrbyfloat(key : string, increment : number, callback : (Error, string) -> void) : void;

    function info(callback : (Error, string[]) -> void) : void;
    function info(section : string, callback : (Error, string[]) -> void) : void;

    function keys(pattern : string, callback : (Error, string[]) -> void) : void;

    function lastsave(callback : (Error, int) -> int) : void;

    function lindex(key : string, value : string, callback : (Error, int) -> void) : void;

    function linsert(key : string, direction : string, pivot : string, value : string) : void;
    function linsert(key : string, direction : string, pivot : string, value : string, callback : (Error) -> void) : void;
    function linsert(key : string, direction : string, pivot : string, value : string, callback : (Error, int) -> void) : void;

    function llen(key : string, callback : (Error, int) -> void) : void;

    function lpop(key : string, callback : (Error, string[]) -> void) : void;
    function lpop(keys : string[], callback : (Error, string[]) -> void) : void;

    function lpush(key : string, value : string) : void;
    function lpush(key : string, value : string, callback : (Error) -> void) : void;
    function lpush(key : string, value : string, callback : (Error, int) -> void) : void;
    function lpush(key : string, values : string[]) : void;
    function lpush(key : string, values : string[], callback : (Error) -> void) : void;
    function lpush(key : string, values : string[], callback : (Error, int) -> void) : void;

    function lpushx(key : string, value : string) : void;
    function lpushx(key : string, value : string, callback : (Error) -> void) : void;
    function lpushx(key : string, value : string, callback : (Error, int) -> void) : void;

    function lrange(key : string, start : int, stop : int, callback : (Error, string[]) -> void) : void;

    function lrem(key : string, count : int, value : string) : void;
    function lrem(key : string, count : int, value : string, callback : (Error) -> void) : void;
    function lrem(key : string, count : int, value : string, callback : (Error, int) -> void) : void;

    function lset(key : string, index : int, value : string) : void;
    function lset(key : string, index : int, value : string, callback : (Error) -> void) : void;
    function lset(key : string, index : int, value : string, callback : (Error, string) -> void) : void;

    function ltrim(key : string, start : int, stop : int) : void;
    function ltrim(key : string, start : int, stop : int, callback : (Error) -> void) : void;
    function ltrim(key : string, start : int, stop : int, callback : (Error, string) -> void) : void;

    function mget(keys : string[], callback : (Error, string[]) -> void) : void;

    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string) : void;
    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string, callback : (Error) -> void) : void;
    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string, callback : (Error, string) -> void) : void;

    function monitor() : void;
    function monitor(callback : (Error) -> void) : void;
    function monitor(callback : (Error, string) -> void) : void;

    function move(key : string, db : string) : void;
    function move(key : string, db : string, callback : (Error) -> void) : void;
    function move(key : string, db : string, callback : (Error, int) -> void) : void;

    function mset(items : variant[]) : void;
    function mset(items : variant[], callback : (Error) -> void) : void;
    function mset(items : variant[], callback : (Error, string) -> void) : void;
    function mset(items : string[]) : void;
    function mset(items : string[], callback : (Error) -> void) : void;
    function mset(items : string[], callback : (Error, string) -> void) : void;

    function msetnx(items : string[]) : void;
    function msetnx(items : string[], callback : (Error) -> void) : void;
    function msetnx(items : string[], value : string, callback : (Error, int) -> void) : void;

    function objectrefcount(key : string, callback : (Error, int) -> void) : void;
    function objectencoding(key : string, callback : (Error, string) -> void) : void;
    function objectidletime(key : string, callback : (Error, int) -> void) : void;

    function persist(key : string) : void;
    function persist(key : string, callback : (Error) -> void) : void;
    function persist(key : string, callback : (Error, int) -> void) : void;

    function pexpire(key : string, milliseconds : int, value : string) : void;
    function pexpire(key : string, milliseconds : int, value : string, callback : (Error) -> void) : void;
    function pexpire(key : string, milliseconds : int, value : string, callback : (Error, int) -> void) : void;

    function pexpireat(key : string, millisecondsTimestamp : int, value : string) : void;
    function pexpireat(key : string, millisecondsTimestamp : int, value : string, callback : (Error) -> void) : void;
    function pexpireat(key : string, millisecondsTimestamp : int, value : string, callback : (Error, int) -> void) : void;

    function ping(callback : (Error, string) -> void) : void;

    function psetex(key : string, milliseconds : int, value : string) : void;
    function psetex(key : string, milliseconds : int, value : string, callback : (Error) -> void) : void;
    function psetex(key : string, milliseconds : int, value : string, callback : (Error, string) -> void) : void;

    function psubscribe(pattern : string) : void;
    function psubscribe(patterns : string[]) : void;

    function pttl(key : string, callback : (Error, int) -> void) : void;

    function publish(channel : string, message : string) : void;
    function publish(channel : string, message : string, callback : (Error) -> void) : void;
    function publish(channel : string, message : string, callback : (Error, int) -> void) : void;

    function pubsubchannels(callback : (Error, string[]) -> void) : void;
    function pubsubchannels(pattern : string, callback : (Error, string[]) -> void) : void;

    function pubsubnumsub(channel : string, callback : (Error, string[]) -> void) : void;
    function pubsubnumsub(channels : string[], callback : (Error, string[]) -> void) : void;

    function pubsubnumpat(callback : (Error, int) -> void) : void;

    function punsubscribe() : void;
    function punsubscribe(pattern : string) : void;
    function punsubscribe(patterns : string[]) : void;

    function quit() : void;
    function quit(callback : (Error) -> void) : void;
    function quit(callback : (Error, string) -> void) : void;

    function randomkey(callback : (Error, Nullable.<string>) -> void) : void;

    function rename(key : string, newkey : string) : void;
    function rename(key : string, newkey : string, callback : (Error) -> void) : void;
    function rename(key : string, newkey : string, callback : (Error, string) -> void) : void;

    function renamenx(key : string, newkey : string) : void;
    function renamenx(key : string, newkey : string, callback : (Error) -> void) : void;
    function renamenx(key : string, newkey : string, callback : (Error, int) -> void) : void;

    function restore(key : string, ttl : int, serializedValue : string) : void;
    function restore(key : string, ttl : int, serializedValue : string, callback : (Error) -> void) : void;
    function restore(key : string, ttl : int, serializedValue : string, callback : (Error, string) -> void) : void;

    function rpop(key : string, callback : (Error, string[]) -> void) : void;
    function rpop(keys : string[], callback : (Error, string[]) -> void) : void;

    function rpoplpush(source : string, destination : string, callback : (Error, string[]) -> void) : void;

    function rpush(key : string, value : string) : void;
    function rpush(key : string, value : string, callback : (Error) -> void) : void;
    function rpush(key : string, value : string, callback : (Error, int) -> void) : void;
    function rpush(key : string, values : string[]) : void;
    function rpush(key : string, values : string[], callback : (Error) -> void) : void;
    function rpush(key : string, values : string[], callback : (Error, int) -> void) : void;

    function rpushx(key : string, value : string) : void;
    function rpushx(key : string, value : string, callback : (Error) -> void) : void;
    function rpushx(key : string, value : string, callback : (Error, int) -> void) : void;

    function sadd(key : string, member : string) : void;
    function sadd(key : string, member : string, callback : (Error) -> void) : void;
    function sadd(key : string, member : string, callback : (Error, int) -> void) : void;
    function sadd(key : string, members : string[]) : void;
    function sadd(key : string, members : string[], callback : (Error) -> void) : void;
    function sadd(key : string, members : string[], callback : (Error, int) -> void) : void;

    function save() : void;
    function save(callback : (Error) -> void) : void;
    function save(callback : (Error, string) -> void) : void;

    function scard(key : string, callback : (Error, int) -> void) : void;

    function scriptexists(script : string, callback : (Error, int[]) -> void) : void;
    function scriptexists(scripts : string[], callback : (Error, int[]) -> void) : void;

    function scriptflush(callback : () -> void) : void;
    function scriptflush(callback : (Error) -> void) : void;
    function scriptflush(callback : (Error, string) -> void) : void;

    function scriptkill(callback : () -> void) : void;
    function scriptkill(callback : (Error) -> void) : void;
    function scriptkill(callback : (Error, string) -> void) : void;

    function scriptload(script : string, callback : (Error, string) -> void) : void;

    function sdiff(key : string, set : string, callback : (Error, string[]) -> void) : void;
    function sdiff(key : string, sets : string[], callback : (Error, string[]) -> void) : void;

    function sdiffstore(destination : string, key : string, set : string) : void;
    function sdiffstore(destination : string, key : string, set : string, callback : (Error) -> void) : void;
    function sdiffstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : void;
    function sdiffstore(destination : string, key : string, sets : string[]) : void;
    function sdiffstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : void;
    function sdiffstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : void;

    function select() : void;

    function set(key : string, value : string) : void;
    function set(key : string, value : string, callback : (Error) -> void) : void;
    function set(key : string, value : string, callback : (Error, string) -> void) : void;

    function setbit(key : string, offset : int, value : int) : void;
    function setbit(key : string, offset : int, value : int, callback : (Error) -> void) : void;
    function setbit(key : string, offset : int, value : int, callback : (Error, int) -> void) : void;

    function setex(key : string, seconds : int, value : string) : void;
    function setex(key : string, seconds : int, value : string, callback : (Error) -> void) : void;
    function setex(key : string, seconds : int, value : string, callback : (Error, string) -> void) : void;

    function setnx(key : string, value : string) : void;
    function setnx(key : string, value : string, callback : (Error) -> void) : void;
    function setnx(key : string, value : string, callback : (Error, int) -> void) : void;

    function setrange(key : string, offset : int, value : string) : void;
    function setrange(key : string, offset : int, value : string, callback : (Error) -> void) : void;
    function setrange(key : string, offset : int, value : string, callback : (Error, int) -> void) : void;

    function shutdown() : void;
    function shutdown(callback : (Error) -> void) : void;
    function shutdown(callback : (Error, string) -> void) : void;
    function shutdown(param : string) : void;
    function shutdown(param : string, callback : (Error) -> void) : void;
    function shutdown(param : string, callback : (Error, string) -> void) : void;

    function sinter(key : string, set : string, callback : (Error, string[]) -> void) : void;
    function sinter(key : string, sets : string[], callback : (Error, string[]) -> void) : void;

    function sintertore(destination : string, key : string, set : string) : void;
    function sinterstore(destination : string, key : string, set : string, callback : (Error) -> void) : void;
    function sinterstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : void;
    function sinterstore(destination : string, key : string, sets : string[]) : void;
    function sinterstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : void;
    function sinterstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : void;

    function sismember(key : string, member : string, callback : (Error, int) -> void) : void;

    function slaveof(host : string, port : int) : void;
    function slaveof(host : string, port : int, callback : (Error) -> void) : void;
    function slaveof(host : string, port : int, callback : (Error, string) -> void) : void;

    //function slowlog() : void;

    function smembers(key : string, callback : (Error, string[]) -> void) : void;

    function smove(destination : string, key : string, member : string) : void;
    function smove(destination : string, key : string, member : string, callback : (Error) -> void) : void;
    function smove(destination : string, key : string, member : string, callback : (Error, int) -> void) : void;

    function sort(key : string) : void;
    function sort(key : string, callback : (Error) -> void) : void;
    function sort(key : string, callback : (Error, string[]) -> void) : void;
    function sort(key : string, params : string[]) : void;
    function sort(key : string, params : string[], callback : (Error) -> void) : void;
    function sort(key : string, params : string[], callback : (Error, string[]) -> void) : void;

    function spop(key : string) : void;
    function spop(key : string, callback : (Error) -> void) : void;
    function spop(key : string, callback : (Error, string) -> void) : void;

    function srandmember(key : string, callback : (Error, string) -> void) : void;
    function srandmember(key : string, count : int, callback : (Error, string[]) -> void) : void;

    function srem(key : string, member : string) : void;
    function srem(key : string, member : string, callback : (Error) -> void) : void;
    function srem(key : string, member : string, callback : (Error, int) -> void) : void;
    function srem(key : string, members : string[]) : void;
    function srem(key : string, members : string[], callback : (Error) -> void) : void;
    function srem(key : string, members : string[], callback : (Error, int) -> void) : void;

    function strlen(key : string, callback : (Error, int) -> void) : void;

    function subscribe(channel : string) : void;
    function subscribe(channels : string[]) : void;

    function sunion(key : string, set : string, callback : (Error, string[]) -> void) : void;
    function sunion(key : string, sets : string[], callback : (Error, string[]) -> void) : void;

    function sunionstore(destination : string, key : string, set : string) : void;
    function sunionstore(destination : string, key : string, set : string, callback : (Error) -> void) : void;
    function sunionstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : void;
    function sunionstore(destination : string, key : string, sets : string[]) : void;
    function sunionstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : void;
    function sunionstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : void;

    function time(callback : (Error, string[]) -> void) : void;

    function ttl(key : string, callback : (Error, int) -> void) : void;

    function type(key : string, callback : (Error, string) -> void) : void;

    function unsubscribe() : void;
    function unsubscribe(channel : string) : void;
    function unsubscribe(channels : string[]) : void;

    function zadd(key : string, score : int, member : string) : void;
    function zadd(key : string, score : int, member : string, callback : (Error) -> void) : void;
    function zadd(key : string, score : int, member : string, callback : (Error, int) -> void) : void;
    function zadd(key : string, members : variant[]) : void;
    function zadd(key : string, members : variant[], callback : (Error) -> void) : void;
    function zadd(key : string, members : variant[], callback : (Error, int) -> void) : void;

    function zcard(key : string, callback : (Error, int) -> void) : void;

    function zcount(key : string, min : int, max : int, callback : (Error, int) -> void) : void;

    function zincrby(key : string, increment : int, member : string) : void;
    function zincrby(key : string, increment : int, member : string, callback : (Error) -> void) : void;
    function zincrby(key : string, increment : int, member : string, callback : (Error, string) -> void) : void;

    function zinterstore(destination : string, numkeys : int, params : string[]) : void;
    function zinterstore(destination : string, numkeys : int, params : string[], callback : (Error) -> void) : void;
    function zinterstore(destination : string, numkeys : int, params : string[], callback : (Error, int) -> void) : void;

    function zrange(key : string, start : int, end : int, callback : (Error, string[]) -> void) : void;
    function zrange(key : string, start : int, end : int, withscore : string, callback : (Error, variant[]) -> void) : void;

    function zrangebyscore(key : string, min : int, max : int, callback : (Error, string[]) -> void) : void;
    function zrangebyscore(key : string, min : int, max : int, option : variant[], callback : (Error, variant[]) -> void) : void;
    function zrangebyscore(key : string, min : int, max : int, option : string[], callback : (Error, variant[]) -> void) : void;
    function zrangebyscore(key : string, min : string, max : int, callback : (Error, string[]) -> void) : void;
    function zrangebyscore(key : string, min : string, max : int, option : variant[], callback : (Error, variant[]) -> void) : void;
    function zrangebyscore(key : string, min : string, max : int, option : string[], callback : (Error, variant[]) -> void) : void;
    function zrangebyscore(key : string, min : int, max : string, callback : (Error, string[]) -> void) : void;
    function zrangebyscore(key : string, min : int, max : string, option : variant[], callback : (Error, variant[]) -> void) : void;
    function zrangebyscore(key : string, min : int, max : string, option : string[], callback : (Error, variant[]) -> void) : void;
    function zrangebyscore(key : string, min : string, max : string, callback : (Error, string[]) -> void) : void;
    function zrangebyscore(key : string, min : string, max : string, option : variant[], callback : (Error, variant[]) -> void) : void;
    function zrangebyscore(key : string, min : string, max : string, option : string[], callback : (Error, variant[]) -> void) : void;

    function zrank(key : string, member : string, callback : (Error, int) -> void) : void;

    function zrem(key : string, member : string) : void;
    function zrem(key : string, member : string[]) : void;
    function zrem(key : string, member : string, callback : (Error) -> void) : void;
    function zrem(key : string, member : string[], callback : (Error) -> void) : void;
    function zrem(key : string, member : string, callback : (Error, int) -> void) : void;
    function zrem(key : string, member : string[], callback : (Error, int) -> void) : void;

    function zremrangebyrank(key : string, start : int, stop : int) : void;
    function zremrangebyrank(key : string, start : int, stop : int, callback : (Error) -> void) : void;
    function zremrangebyrank(key : string, start : int, stop : int, callback : (Error, int) -> void) : void;

    function zremrangebyscore(key : string, min : int, max : int) : void;
    function zremrangebyscore(key : string, min : int, max : int, callback : (Error) -> void) : void;
    function zremrangebyscore(key : string, min : int, max : int, callback : (Error, int) -> void) : void;

    function zrevrange(key : string, start : int, end : int, callback : (Error, string[]) -> void) : void;
    function zrevrange(key : string, start : int, end : int, withscore : string, callback : (Error, variant[]) -> void) : void;

    function zrevrangebyscore(key : string, min : int, max : int, callback : (Error, string[]) -> void) : void;
    function zrevrangebyscore(key : string, min : int, max : int, option : variant[], callback : (Error, variant[]) -> void) : void;
    function zrevrangebyscore(key : string, min : int, max : int, option : string[], callback : (Error, variant[]) -> void) : void;
    function zrevrangebyscore(key : string, min : string, max : int, callback : (Error, string[]) -> void) : void;
    function zrevrangebyscore(key : string, min : string, max : int, option : variant[], callback : (Error, variant[]) -> void) : void;
    function zrevrangebyscore(key : string, min : string, max : int, option : string[], callback : (Error, variant[]) -> void) : void;
    function zrevrangebyscore(key : string, min : int, max : string, callback : (Error, string[]) -> void) : void;
    function zrevrangebyscore(key : string, min : int, max : string, option : variant[], callback : (Error, variant[]) -> void) : void;
    function zrevrangebyscore(key : string, min : int, max : string, option : string[], callback : (Error, variant[]) -> void) : void;
    function zrevrangebyscore(key : string, min : string, max : string, callback : (Error, string[]) -> void) : void;
    function zrevrangebyscore(key : string, min : string, max : string, option : variant[], callback : (Error, variant[]) -> void) : void;
    function zrevrangebyscore(key : string, min : string, max : string, option : string[], callback : (Error, variant[]) -> void) : void;

    function zrevrank(key : string, member : string, callback : (Error, int) -> void) : void;

    function zscore(key : string, member : string, callback : (Error, string) -> void) : void;

    function zunionstore(destination : string, numkeys : int, params : string[]) : void;
    function zunionstore(destination : string, numkeys : int, params : string[], callback : (Error) -> void) : void;
    function zunionstore(destination : string, numkeys : int, params : string[], callback : (Error, int) -> void) : void;
}

native __fake__ class RedisTransaction
{
    function exec () : void;
    function exec (callback : (Error) -> void) : void;
    function exec (callback : (Error, variant[]) -> void) : void;

    function bitcount(key : string) : RedisTransaction;
    function bitcount(key : string, callback : (Error) -> void) : RedisTransaction;
    function bitcount(key : string, callback : (Error, int) -> void) : RedisTransaction;
    function bitcount(key : string, start : int) : RedisTransaction;
    function bitcount(key : string, start : int, callback : (Error) -> void) : RedisTransaction;
    function bitcount(key : string, start : int, callback : (Error, int) -> void) : RedisTransaction;
    function bitcount(key : string, start : int, end : int) : RedisTransaction;
    function bitcount(key : string, start : int, end : int, callback : (Error) -> void) : RedisTransaction;
    function bitcount(key : string, start : int, end : int, callback : (Error, int) -> void) : RedisTransaction;

    function bitop(operation : string, destkey : string, srckey : string, callback : (Error, int) -> void) : RedisTransaction;
    function bitop(operation : string, destkey : string, srckey : string[]) : RedisTransaction;
    function bitop(operation : string, destkey : string, srckey : string[], callback : (Error) -> void) : RedisTransaction;
    function bitop(operation : string, destkey : string, srckey : string[], callback : (Error, int) -> void) : RedisTransaction;

    function blpop(key : string, timeout : int) : RedisTransaction;
    function blpop(key : string, timeout : int, callback : (Error) -> void) : RedisTransaction;
    function blpop(key : string, timeout : int, callback : (Error, string[]) -> void) : RedisTransaction;
    function blpop(keys : string[], timeout : int) : RedisTransaction;
    function blpop(keys : string[], timeout : int, callback : (Error) -> void) : RedisTransaction;
    function blpop(keys : string[], timeout : int, callback : (Error, string[]) -> void) : RedisTransaction;

    function brpop(key : string, timeout : int) : RedisTransaction;
    function brpop(key : string, timeout : int, callback : (Error) -> void) : RedisTransaction;
    function brpop(key : string, timeout : int, callback : (Error, string[]) -> void) : RedisTransaction;
    function brpop(keys : string[], timeout : int) : RedisTransaction;
    function brpop(keys : string[], timeout : int, callback : (Error) -> void) : RedisTransaction;
    function brpop(keys : string[], timeout : int, callback : (Error, string[]) -> void) : RedisTransaction;

    function brpoplpush(source : string, destination : string, timeout : int) : RedisTransaction;
    function brpoplpush(source : string, destination : string, timeout : int, callback : (Error) -> void) : RedisTransaction;
    function brpoplpush(source : string, destination : string, timeout : int, callback : (Error, string[]) -> void) : RedisTransaction;

    function dbsize() : RedisTransaction;
    function dbsize(callback : (Error) -> void) : RedisTransaction;
    function dbsize(callback : (Error, int) -> void) : RedisTransaction;

    function decr(key : string) : RedisTransaction;
    function decr(key : string, callback : (Error) -> void) : RedisTransaction;
    function decr(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function decrby(key : string, decrement : int) : RedisTransaction;
    function decrby(key : string, decrement : int, callback : (Error) -> void) : RedisTransaction;
    function decrby(key : string, decrement : int, callback : (Error, int) -> void) : RedisTransaction;

    function del(key : string) : RedisTransaction;
    function del(key : string, callback : (Error) -> void) : RedisTransaction;
    function del(key : string, callback : (Error, int) -> void) : RedisTransaction;
    function del(keys : string[]) : RedisTransaction;
    function del(keys : string[], callback : (Error) -> void) : RedisTransaction;
    function del(keys : string[], callback : (Error, int) -> void) : RedisTransaction;

    function discard() : RedisTransaction;
    function discard(callback : (Error) -> void) : RedisTransaction;
    function discard(callback : (Error, string) -> void) : RedisTransaction;

    function dump(key : string) : RedisTransaction;
    function dump(key : string, callback : (Error) -> void) : RedisTransaction;
    function dump(key : string, callback : (Error, string) -> void) : RedisTransaction;

    function echo(message : string) : RedisTransaction;
    function echo(message : string, callback : (Error) -> void) : RedisTransaction;
    function echo(message : string, callback : (Error, string) -> void) : RedisTransaction;

    function eval(script : string, numkeys : int) : RedisTransaction;
    function eval(script : string, numkeys : int, callback : (Error) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, callback : (Error, variant) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, callback : (Error, int) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, callback : (Error, string) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, callback : (Error, int[]) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, callback : (Error, string[]) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys_or_args : string[]) : RedisTransaction;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, variant) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, int) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, string) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, int[]) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, string[]) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys : string[], args : string[]) : RedisTransaction;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, variant) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, int) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, string) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, int[]) -> void) : RedisTransaction;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, string[]) -> void) : RedisTransaction;

    function evalsha(sha1 : string, numkeys : int) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, callback : (Error) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, variant) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, int) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, string) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, int[]) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, string[]) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[]) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, variant) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, int) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, string) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, int[]) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, string[]) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[]) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, variant) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, int) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, string) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, int[]) -> void) : RedisTransaction;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, string[]) -> void) : RedisTransaction;

    function exists(key : string) : RedisTransaction;
    function exists(key : string, callback : (Error) -> void) : RedisTransaction;
    function exists(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function expire(key : string, seconds : int, value : string) : RedisTransaction;
    function expire(key : string, seconds : int, value : string, callback : (Error) -> void) : RedisTransaction;
    function expire(key : string, seconds : int, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function expireat(key : string, timestamp : int, value : string) : RedisTransaction;
    function expireat(key : string, timestamp : int, value : string, callback : (Error) -> void) : RedisTransaction;
    function expireat(key : string, timestamp : int, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function get(key : string) : RedisTransaction;
    function get(key : string, callback : (Error) -> void) : RedisTransaction;
    function get(key : string, callback : (Error, string) -> void) : RedisTransaction;

    function getbit(key : string, offset : int) : RedisTransaction;
    function getbit(key : string, offset : int, callback : (Error) -> void) : RedisTransaction;
    function getbit(key : string, offset : int, callback : (Error, int) -> void) : RedisTransaction;

    function getrange(key : string, start : int, end : int) : RedisTransaction;
    function getrange(key : string, start : int, end : int, callback : (Error) -> void) : RedisTransaction;
    function getrange(key : string, start : int, end : int, callback : (Error, string) -> void) : RedisTransaction;

    function getset(key : string, value : string) : RedisTransaction;
    function getset(key : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function getset(key : string, value : string, callback : (Error, string) -> void) : RedisTransaction;

    function hdel(key : string, field : string) : RedisTransaction;
    function hdel(key : string, field : string, callback : (Error) -> void) : RedisTransaction;
    function hdel(key : string, field : string, callback : (Error, int) -> void) : RedisTransaction;
    function hdel(key : string, fields : string[]) : RedisTransaction;
    function hdel(key : string, fields : string[], callback : (Error) -> void) : RedisTransaction;
    function hdel(key : string, fields : string[], callback : (Error, int) -> void) : RedisTransaction;

    function hexists(key : string, field : string) : RedisTransaction;
    function hexists(key : string, field : string, callback : (Error) -> void) : RedisTransaction;
    function hexists(key : string, field : string, callback : (Error, int) -> void) : RedisTransaction;

    function hget(key : string, field : string) : RedisTransaction;
    function hget(key : string, field : string, callback : (Error) -> void) : RedisTransaction;
    function hget(key : string, field : string, callback : (Error, Nullable.<string>) -> void) : RedisTransaction;

    function hgetall(key : string) : RedisTransaction;
    function hgetall(key : string, callback : (Error) -> void) : RedisTransaction;
    function hgetall(key : string, callback : (Error, string[]) -> void) : RedisTransaction;

    function hincrby(key : string, field : string, increment : int) : RedisTransaction;
    function hincrby(key : string, field : string, increment : int, callback : (Error) -> void) : RedisTransaction;
    function hincrby(key : string, field : string, increment : int, callback : (Error, int) -> void) : RedisTransaction;

    function hincrbyfloat(key : string, field : string, increment : number) : RedisTransaction;
    function hincrbyfloat(key : string, field : string, increment : number, callback : (Error) -> void) : RedisTransaction;
    function hincrbyfloat(key : string, field : string, increment : number, callback : (Error, string) -> void) : RedisTransaction;

    function hkeys(key : string) : RedisTransaction;
    function hkeys(key : string, callback : (Error) -> void) : RedisTransaction;
    function hkeys(key : string, callback : (Error, string[]) -> void) : RedisTransaction;

    function hlen(key : string) : RedisTransaction;
    function hlen(key : string, callback : (Error) -> void) : RedisTransaction;
    function hlen(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function hmget(keys : string, field : string[]) : RedisTransaction;
    function hmget(keys : string, field : string[], callback : (Error) -> void) : RedisTransaction;
    function hmget(keys : string, field : string[], callback : (Error, string[]) -> void) : RedisTransaction;

    function hmset(hash : string, obj : string[]) : RedisTransaction;
    function hmset(hash : string, obj : string[], callback : (Error) -> void) : RedisTransaction;
    function hmset(hash : string, obj : string[], callback : (Error, string) -> void) : RedisTransaction;
    function hmset(hash : string, obj : Map.<string>) : RedisTransaction;
    function hmset(hash : string, obj : Map.<string>, callback : (Error) -> void) : RedisTransaction;
    function hmset(hash : string, obj : Map.<string>, callback : (Error, string) -> void) : RedisTransaction;

    function hset(key : string, field : string, value : string) : RedisTransaction;
    function hset(key : string, field : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function hset(key : string, field : string, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function hsetnx(key : string, field : string, value : string) : RedisTransaction;
    function hsetnx(key : string, field : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function hsetnx(key : string, field : string, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function hvals(key : string) : RedisTransaction;
    function hvals(key : string, callback : (Error) -> void) : RedisTransaction;
    function hvals(key : string, callback : (Error, string[]) -> void) : RedisTransaction;

    function incr(key : string) : RedisTransaction;
    function incr(key : string, callback : (Error) -> void) : RedisTransaction;
    function incr(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function incrby(key : string, increment : int) : RedisTransaction;
    function incrby(key : string, increment : int, callback : (Error) -> void) : RedisTransaction;
    function incrby(key : string, increment : int, callback : (Error, int) -> void) : RedisTransaction;

    function incrbyfloat(key : string, increment : number) : RedisTransaction;
    function incrbyfloat(key : string, increment : number, callback : (Error) -> void) : RedisTransaction;
    function incrbyfloat(key : string, increment : number, callback : (Error, string) -> void) : RedisTransaction;

    function keys(pattern : string) : RedisTransaction;
    function keys(pattern : string, callback : (Error) -> void) : RedisTransaction;
    function keys(pattern : string, callback : (Error, string[]) -> void) : RedisTransaction;

    function lindex(key : string, value : string) : RedisTransaction;
    function lindex(key : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function lindex(key : string, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function linsert(key : string, direction : string, pivot : string, value : string) : RedisTransaction;
    function linsert(key : string, direction : string, pivot : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function linsert(key : string, direction : string, pivot : string, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function llen(key : string) : RedisTransaction;
    function llen(key : string, callback : (Error) -> void) : RedisTransaction;
    function llen(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function lpop(key : string) : RedisTransaction;
    function lpop(key : string, callback : (Error) -> void) : RedisTransaction;
    function lpop(key : string, callback : (Error, string[]) -> void) : RedisTransaction;
    function lpop(keys : string[]) : RedisTransaction;
    function lpop(keys : string[], callback : (Error) -> void) : RedisTransaction;
    function lpop(keys : string[], callback : (Error, string[]) -> void) : RedisTransaction;

    function lpush(key : string, value : string) : RedisTransaction;
    function lpush(key : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function lpush(key : string, value : string, callback : (Error, int) -> void) : RedisTransaction;
    function lpush(key : string, values : string[]) : RedisTransaction;
    function lpush(key : string, values : string[], callback : (Error) -> void) : RedisTransaction;
    function lpush(key : string, values : string[], callback : (Error, int) -> void) : RedisTransaction;

    function lpushx(key : string, value : string) : RedisTransaction;
    function lpushx(key : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function lpushx(key : string, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function lrange(key : string, start : int, stop : int) : RedisTransaction;
    function lrange(key : string, start : int, stop : int, callback : (Error) -> void) : RedisTransaction;
    function lrange(key : string, start : int, stop : int, callback : (Error, string[]) -> void) : RedisTransaction;

    function lrem(key : string, count : int, value : string) : RedisTransaction;
    function lrem(key : string, count : int, value : string, callback : (Error) -> void) : RedisTransaction;
    function lrem(key : string, count : int, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function lset(key : string, index : int, value : string) : RedisTransaction;
    function lset(key : string, index : int, value : string, callback : (Error) -> void) : RedisTransaction;
    function lset(key : string, index : int, value : string, callback : (Error, string) -> void) : RedisTransaction;

    function ltrim(key : string, start : int, stop : int) : RedisTransaction;
    function ltrim(key : string, start : int, stop : int, callback : (Error) -> void) : RedisTransaction;
    function ltrim(key : string, start : int, stop : int, callback : (Error, string) -> void) : RedisTransaction;

    function mget(keys : string[]) : RedisTransaction;
    function mget(keys : string[], callback : (Error) -> void) : RedisTransaction;
    function mget(keys : string[], callback : (Error, string[]) -> void) : RedisTransaction;

    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string) : RedisTransaction;
    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string, callback : (Error) -> void) : RedisTransaction;
    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string, callback : (Error, string) -> void) : RedisTransaction;

    function move(key : string, db : string) : RedisTransaction;
    function move(key : string, db : string, callback : (Error) -> void) : RedisTransaction;
    function move(key : string, db : string, callback : (Error, int) -> void) : RedisTransaction;

    function mset(items : variant[]) : RedisTransaction;
    function mset(items : variant[], callback : (Error) -> void) : RedisTransaction;
    function mset(items : variant[], callback : (Error, string) -> void) : RedisTransaction;
    function mset(items : string[]) : RedisTransaction;
    function mset(items : string[], callback : (Error) -> void) : RedisTransaction;
    function mset(items : string[], callback : (Error, string) -> void) : RedisTransaction;

    function msetnx(items : string[]) : RedisTransaction;
    function msetnx(items : string[], callback : (Error) -> void) : RedisTransaction;
    function msetnx(items : string[], value : string, callback : (Error, int) -> void) : RedisTransaction;

    function objectrefcount(key : string, callback : (Error, int) -> void) : RedisTransaction;
    function objectencoding(key : string, callback : (Error, string) -> void) : RedisTransaction;
    function objectidletime(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function persist(key : string) : RedisTransaction;
    function persist(key : string, callback : (Error) -> void) : RedisTransaction;
    function persist(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function pexpire(key : string, milliseconds : int, value : string) : RedisTransaction;
    function pexpire(key : string, milliseconds : int, value : string, callback : (Error) -> void) : RedisTransaction;
    function pexpire(key : string, milliseconds : int, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function pexpireat(key : string, millisecondsTimestamp : int, value : string) : RedisTransaction;
    function pexpireat(key : string, millisecondsTimestamp : int, value : string, callback : (Error) -> void) : RedisTransaction;
    function pexpireat(key : string, millisecondsTimestamp : int, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function ping() : RedisTransaction;
    function ping(callback : (Error) -> void) : RedisTransaction;
    function ping(callback : (Error, string) -> void) : RedisTransaction;

    function psetex(key : string, milliseconds : int, value : string) : RedisTransaction;
    function psetex(key : string, milliseconds : int, value : string, callback : (Error) -> void) : RedisTransaction;
    function psetex(key : string, milliseconds : int, value : string, callback : (Error, string) -> void) : RedisTransaction;

    function pttl(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function publish(channel : string, message : string) : RedisTransaction;
    function publish(channel : string, message : string, callback : (Error) -> void) : RedisTransaction;
    function publish(channel : string, message : string, callback : (Error, int) -> void) : RedisTransaction;

    function pubsubchannels() : RedisTransaction;
    function pubsubchannels(callback : (Error) -> void) : RedisTransaction;
    function pubsubchannels(callback : (Error, string[]) -> void) : RedisTransaction;
    function pubsubchannels(pattern : string) : RedisTransaction;
    function pubsubchannels(pattern : string, callback : (Error) -> void) : RedisTransaction;
    function pubsubchannels(pattern : string, callback : (Error, string[]) -> void) : RedisTransaction;

    function pubsubnumsub(channel : string) : RedisTransaction;
    function pubsubnumsub(channel : string, callback : (Error) -> void) : RedisTransaction;
    function pubsubnumsub(channel : string, callback : (Error, string[]) -> void) : RedisTransaction;
    function pubsubnumsub(channels : string[]) : RedisTransaction;
    function pubsubnumsub(channels : string[], callback : (Error) -> void) : RedisTransaction;
    function pubsubnumsub(channels : string[], callback : (Error, string[]) -> void) : RedisTransaction;

    function pubsubnumpat() : RedisTransaction;
    function pubsubnumpat(callback : (Error) -> void) : RedisTransaction;
    function pubsubnumpat(callback : (Error, int) -> void) : RedisTransaction;

    function quit() : RedisTransaction;
    function quit(callback : (Error) -> void) : RedisTransaction;
    function quit(callback : (Error, string) -> void) : RedisTransaction;

    function randomkey() : RedisTransaction;
    function randomkey(callback : (Error) -> void) : RedisTransaction;
    function randomkey(callback : (Error, Nullable.<string>) -> void) : RedisTransaction;

    function rename(key : string, newkey : string) : RedisTransaction;
    function rename(key : string, newkey : string, callback : (Error) -> void) : RedisTransaction;
    function rename(key : string, newkey : string, callback : (Error, string) -> void) : RedisTransaction;

    function renamenx(key : string, newkey : string) : RedisTransaction;
    function renamenx(key : string, newkey : string, callback : (Error) -> void) : RedisTransaction;
    function renamenx(key : string, newkey : string, callback : (Error, int) -> void) : RedisTransaction;

    function restore(key : string, ttl : int, serializedValue : string) : RedisTransaction;
    function restore(key : string, ttl : int, serializedValue : string, callback : (Error) -> void) : RedisTransaction;
    function restore(key : string, ttl : int, serializedValue : string, callback : (Error, string) -> void) : RedisTransaction;

    function rpop(key : string) : RedisTransaction;
    function rpop(key : string, callback : (Error) -> void) : RedisTransaction;
    function rpop(key : string, callback : (Error, string[]) -> void) : RedisTransaction;
    function rpop(keys : string[]) : RedisTransaction;
    function rpop(keys : string[], callback : (Error) -> void) : RedisTransaction;
    function rpop(keys : string[], callback : (Error, string[]) -> void) : RedisTransaction;

    function rpoplpush(source : string, destination : string) : RedisTransaction;
    function rpoplpush(source : string, destination : string, callback : (Error) -> void) : RedisTransaction;
    function rpoplpush(source : string, destination : string, callback : (Error, string[]) -> void) : RedisTransaction;

    function rpush(key : string, value : string) : RedisTransaction;
    function rpush(key : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function rpush(key : string, value : string, callback : (Error, int) -> void) : RedisTransaction;
    function rpush(key : string, values : string[]) : RedisTransaction;
    function rpush(key : string, values : string[], callback : (Error) -> void) : RedisTransaction;
    function rpush(key : string, values : string[], callback : (Error, int) -> void) : RedisTransaction;

    function rpushx(key : string, value : string) : RedisTransaction;
    function rpushx(key : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function rpushx(key : string, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function sadd(key : string, member : string) : RedisTransaction;
    function sadd(key : string, member : string, callback : (Error) -> void) : RedisTransaction;
    function sadd(key : string, member : string, callback : (Error, int) -> void) : RedisTransaction;
    function sadd(key : string, members : string[]) : RedisTransaction;
    function sadd(key : string, members : string[], callback : (Error) -> void) : RedisTransaction;
    function sadd(key : string, members : string[], callback : (Error, int) -> void) : RedisTransaction;

    function scard(key : string) : RedisTransaction;
    function scard(key : string, callback : (Error) -> void) : RedisTransaction;
    function scard(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function scriptexists(script : string) : RedisTransaction;
    function scriptexists(script : string, callback : (Error) -> void) : RedisTransaction;
    function scriptexists(script : string, callback : (Error, int[]) -> void) : RedisTransaction;
    function scriptexists(scripts : string[]) : RedisTransaction;
    function scriptexists(scripts : string[], callback : (Error) -> void) : RedisTransaction;
    function scriptexists(scripts : string[], callback : (Error, int[]) -> void) : RedisTransaction;

    function scriptflush(callback : () -> void) : RedisTransaction;
    function scriptflush(callback : (Error) -> void) : RedisTransaction;
    function scriptflush(callback : (Error, string) -> void) : RedisTransaction;

    function scriptkill(callback : () -> void) : RedisTransaction;
    function scriptkill(callback : (Error) -> void) : RedisTransaction;
    function scriptkill(callback : (Error, string) -> void) : RedisTransaction;

    function scriptload(script : string) : RedisTransaction;
    function scriptload(script : string, callback : (Error) -> void) : RedisTransaction;
    function scriptload(script : string, callback : (Error, string) -> void) : RedisTransaction;

    function sdiff(key : string, set : string) : RedisTransaction;
    function sdiff(key : string, set : string, callback : (Error) -> void) : RedisTransaction;
    function sdiff(key : string, set : string, callback : (Error, string[]) -> void) : RedisTransaction;
    function sdiff(key : string, sets : string[]) : RedisTransaction;
    function sdiff(key : string, sets : string[], callback : (Error) -> void) : RedisTransaction;
    function sdiff(key : string, sets : string[], callback : (Error, string[]) -> void) : RedisTransaction;

    function sdiffstore(destination : string, key : string, set : string) : RedisTransaction;
    function sdiffstore(destination : string, key : string, set : string, callback : (Error) -> void) : RedisTransaction;
    function sdiffstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : RedisTransaction;
    function sdiffstore(destination : string, key : string, sets : string[]) : RedisTransaction;
    function sdiffstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : RedisTransaction;
    function sdiffstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : RedisTransaction;

    function select(index : int) : RedisTransaction;
    function select(index : int, callback : (Error) -> void) : RedisTransaction;
    function select(index : int, callback : (Error, string) -> void) : RedisTransaction;

    function set(key : string, value : string) : RedisTransaction;
    function set(key : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function set(key : string, value : string, callback : (Error, string) -> void) : RedisTransaction;

    function setbit(key : string, offset : int, value : int) : RedisTransaction;
    function setbit(key : string, offset : int, value : int, callback : (Error) -> void) : RedisTransaction;
    function setbit(key : string, offset : int, value : int, callback : (Error, int) -> void) : RedisTransaction;

    function setex(key : string, seconds : int, value : string) : RedisTransaction;
    function setex(key : string, seconds : int, value : string, callback : (Error) -> void) : RedisTransaction;
    function setex(key : string, seconds : int, value : string, callback : (Error, string) -> void) : RedisTransaction;

    function setnx(key : string, value : string) : RedisTransaction;
    function setnx(key : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function setnx(key : string, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function setrange(key : string, offset : int, value : string) : RedisTransaction;
    function setrange(key : string, offset : int, value : string, callback : (Error) -> void) : RedisTransaction;
    function setrange(key : string, offset : int, value : string, callback : (Error, int) -> void) : RedisTransaction;

    function sinter(key : string, set : string) : RedisTransaction;
    function sinter(key : string, set : string, callback : (Error) -> void) : RedisTransaction;
    function sinter(key : string, set : string, callback : (Error, string[]) -> void) : RedisTransaction;
    function sinter(key : string, sets : string[]) : RedisTransaction;
    function sinter(key : string, sets : string[], callback : (Error) -> void) : RedisTransaction;
    function sinter(key : string, sets : string[], callback : (Error, string[]) -> void) : RedisTransaction;

    function sintertore(destination : string, key : string, set : string) : RedisTransaction;
    function sinterstore(destination : string, key : string, set : string, callback : (Error) -> void) : RedisTransaction;
    function sinterstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : RedisTransaction;
    function sinterstore(destination : string, key : string, sets : string[]) : RedisTransaction;
    function sinterstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : RedisTransaction;
    function sinterstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : RedisTransaction;

    function sismember(key : string, member : string) : RedisTransaction;
    function sismember(key : string, member : string, callback : (Error) -> void) : RedisTransaction;
    function sismember(key : string, member : string, callback : (Error, int) -> void) : RedisTransaction;

    function smembers(key : string) : RedisTransaction;
    function smembers(key : string, callback : (Error) -> void) : RedisTransaction;
    function smembers(key : string, callback : (Error, string[]) -> void) : RedisTransaction;

    function smove(destination : string, key : string, member : string) : RedisTransaction;
    function smove(destination : string, key : string, member : string, callback : (Error) -> void) : RedisTransaction;
    function smove(destination : string, key : string, member : string, callback : (Error, int) -> void) : RedisTransaction;

    function sort(key : string) : RedisTransaction;
    function sort(key : string, callback : (Error) -> void) : RedisTransaction;
    function sort(key : string, callback : (Error, string[]) -> void) : RedisTransaction;
    function sort(key : string, params : string[]) : RedisTransaction;
    function sort(key : string, params : string[], callback : (Error) -> void) : RedisTransaction;
    function sort(key : string, params : string[], callback : (Error, string[]) -> void) : RedisTransaction;

    function spop(key : string) : RedisTransaction;
    function spop(key : string, callback : (Error) -> void) : RedisTransaction;
    function spop(key : string, callback : (Error, string) -> void) : RedisTransaction;

    function srandmember(key : string) : RedisTransaction;
    function srandmember(key : string, callback : (Error) -> void) : RedisTransaction;
    function srandmember(key : string, callback : (Error, string) -> void) : RedisTransaction;
    function srandmember(key : string, count : int) : RedisTransaction;
    function srandmember(key : string, count : int, callback : (Error) -> void) : RedisTransaction;
    function srandmember(key : string, count : int, callback : (Error, string[]) -> void) : RedisTransaction;

    function srem(key : string, member : string) : RedisTransaction;
    function srem(key : string, member : string, callback : (Error) -> void) : RedisTransaction;
    function srem(key : string, member : string, callback : (Error, int) -> void) : RedisTransaction;
    function srem(key : string, members : string[]) : RedisTransaction;
    function srem(key : string, members : string[], callback : (Error) -> void) : RedisTransaction;
    function srem(key : string, members : string[], callback : (Error, int) -> void) : RedisTransaction;

    function strlen(key : string) : RedisTransaction;
    function strlen(key : string, callback : (Error) -> void) : RedisTransaction;
    function strlen(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function sunion(key : string, set : string) : RedisTransaction;
    function sunion(key : string, set : string, callback : (Error) -> void) : RedisTransaction;
    function sunion(key : string, set : string, callback : (Error, string[]) -> void) : RedisTransaction;
    function sunion(key : string, sets : string[]) : RedisTransaction;
    function sunion(key : string, sets : string[], callback : (Error) -> void) : RedisTransaction;
    function sunion(key : string, sets : string[], callback : (Error, string[]) -> void) : RedisTransaction;

    function sunionstore(destination : string, key : string, set : string) : RedisTransaction;
    function sunionstore(destination : string, key : string, set : string, callback : (Error) -> void) : RedisTransaction;
    function sunionstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : RedisTransaction;
    function sunionstore(destination : string, key : string, sets : string[]) : RedisTransaction;
    function sunionstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : RedisTransaction;
    function sunionstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : RedisTransaction;

    function ttl(key : string) : RedisTransaction;
    function ttl(key : string, callback : (Error) -> void) : RedisTransaction;
    function ttl(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function type(key : string) : RedisTransaction;
    function type(key : string, callback : (Error) -> void) : RedisTransaction;
    function type(key : string, callback : (Error, string) -> void) : RedisTransaction;

    function zadd(key : string, score : int, member : string) : RedisTransaction;
    function zadd(key : string, score : int, member : string, callback : (Error) -> void) : RedisTransaction;
    function zadd(key : string, score : int, member : string, callback : (Error, int) -> void) : RedisTransaction;
    function zadd(key : string, members : variant[]) : RedisTransaction;
    function zadd(key : string, members : variant[], callback : (Error) -> void) : RedisTransaction;
    function zadd(key : string, members : variant[], callback : (Error, int) -> void) : RedisTransaction;

    function zcard(key : string) : RedisTransaction;
    function zcard(key : string, callback : (Error) -> void) : RedisTransaction;
    function zcard(key : string, callback : (Error, int) -> void) : RedisTransaction;

    function zcount(key : string, min : int, max : int) : RedisTransaction;
    function zcount(key : string, min : int, max : int, callback : (Error) -> void) : RedisTransaction;
    function zcount(key : string, min : int, max : int, callback : (Error, int) -> void) : RedisTransaction;

    function zincrby(key : string, increment : int, member : string) : RedisTransaction;
    function zincrby(key : string, increment : int, member : string, callback : (Error) -> void) : RedisTransaction;
    function zincrby(key : string, increment : int, member : string, callback : (Error, string) -> void) : RedisTransaction;

    function zinterstore(destination : string, numkeys : int, params : string[]) : RedisTransaction;
    function zinterstore(destination : string, numkeys : int, params : string[], callback : (Error) -> void) : RedisTransaction;
    function zinterstore(destination : string, numkeys : int, params : string[], callback : (Error, int) -> void) : RedisTransaction;

    function zrange(key : string, start : int, end : int) : RedisTransaction;
    function zrange(key : string, start : int, end : int, callback : (Error) -> void) : RedisTransaction;
    function zrange(key : string, start : int, end : int, callback : (Error, string[]) -> void) : RedisTransaction;
    function zrange(key : string, start : int, end : int, withscore : string) : RedisTransaction;
    function zrange(key : string, start : int, end : int, withscore : string, callback : (Error) -> void) : RedisTransaction;
    function zrange(key : string, start : int, end : int, withscore : string, callback : (Error, variant[]) -> void) : RedisTransaction;

    function zrangebyscore(key : string, min : int, max : int) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : int, option : variant[]) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : int, option : string[]) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : int) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : int, option : variant[]) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : int, option : string[]) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : string) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : string, option : variant[]) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : string, option : string[]) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : string) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : string, option : variant[]) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : string, option : string[]) : RedisTransaction;

    function zrangebyscore(key : string, min : int, max : int, callback : (Error) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : int, option : variant[], callback : (Error) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : int, option : string[], callback : (Error) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : int, callback : (Error) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : int, option : variant[], callback : (Error) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : int, option : string[], callback : (Error) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : string, callback : (Error) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : string, option : variant[], callback : (Error) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : string, option : string[], callback : (Error) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : string, callback : (Error) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : string, option : variant[], callback : (Error) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : string, option : string[], callback : (Error) -> void) : RedisTransaction;

    function zrangebyscore(key : string, min : int, max : int, callback : (Error, string[]) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : int, option : variant[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : int, option : string[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : int, callback : (Error, string[]) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : int, option : variant[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : int, option : string[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : string, callback : (Error, string[]) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : string, option : variant[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : int, max : string, option : string[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : string, callback : (Error, string[]) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : string, option : variant[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrangebyscore(key : string, min : string, max : string, option : string[], callback : (Error, variant[]) -> void) : RedisTransaction;

    function zrank(key : string, member : string) : RedisTransaction;
    function zrank(key : string, member : string, callback : (Error) -> void) : RedisTransaction;
    function zrank(key : string, member : string, callback : (Error, int) -> void) : RedisTransaction;

    function zrem(key : string, member : string) : RedisTransaction;
    function zrem(key : string, member : string[]) : RedisTransaction;
    function zrem(key : string, member : string, callback : (Error) -> void) : RedisTransaction;
    function zrem(key : string, member : string[], callback : (Error) -> void) : RedisTransaction;
    function zrem(key : string, member : string, callback : (Error, int) -> void) : RedisTransaction;
    function zrem(key : string, member : string[], callback : (Error, int) -> void) : RedisTransaction;

    function zremrangebyrank(key : string, start : int, stop : int) : RedisTransaction;
    function zremrangebyrank(key : string, start : int, stop : int, callback : (Error) -> void) : RedisTransaction;
    function zremrangebyrank(key : string, start : int, stop : int, callback : (Error, int) -> void) : RedisTransaction;

    function zremrangebyscore(key : string, min : int, max : int) : RedisTransaction;
    function zremrangebyscore(key : string, min : int, max : int, callback : (Error) -> void) : RedisTransaction;
    function zremrangebyscore(key : string, min : int, max : int, callback : (Error, int) -> void) : RedisTransaction;

    function zrevrange(key : string, start : int, end : int) : RedisTransaction;
    function zrevrange(key : string, start : int, end : int, callback : (Error) -> void) : RedisTransaction;
    function zrevrange(key : string, start : int, end : int, callback : (Error, string[]) -> void) : RedisTransaction;
    function zrevrange(key : string, start : int, end : int, withscore : string) : RedisTransaction;
    function zrevrange(key : string, start : int, end : int, withscore : string, callback : (Error) -> void) : RedisTransaction;
    function zrevrange(key : string, start : int, end : int, withscore : string, callback : (Error, variant[]) -> void) : RedisTransaction;

    function zrevrangebyscore(key : string, min : int, max : int) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : int, option : variant[]) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : int, option : string[]) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : int) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : int, option : variant[]) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : int, option : string[]) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : string) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : string, option : variant[]) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : string, option : string[]) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : string) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : string, option : variant[]) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : string, option : string[]) : RedisTransaction;

    function zrevrangebyscore(key : string, min : int, max : int, callback : (Error) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : int, option : variant[], callback : (Error) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : int, option : string[], callback : (Error) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : int, callback : (Error) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : int, option : variant[], callback : (Error) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : int, option : string[], callback : (Error) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : string, callback : (Error) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : string, option : variant[], callback : (Error) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : string, option : string[], callback : (Error) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : string, callback : (Error) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : string, option : variant[], callback : (Error) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : string, option : string[], callback : (Error) -> void) : RedisTransaction;

    function zrevrangebyscore(key : string, min : int, max : int, callback : (Error, string[]) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : int, option : variant[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : int, option : string[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : int, callback : (Error, string[]) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : int, option : variant[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : int, option : string[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : string, callback : (Error, string[]) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : string, option : variant[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : int, max : string, option : string[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : string, callback : (Error, string[]) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : string, option : variant[], callback : (Error, variant[]) -> void) : RedisTransaction;
    function zrevrangebyscore(key : string, min : string, max : string, option : string[], callback : (Error, variant[]) -> void) : RedisTransaction;

    function zrevrank(key : string, member : string) : RedisTransaction;
    function zrevrank(key : string, member : string, callback : (Error) -> void) : RedisTransaction;
    function zrevrank(key : string, member : string, callback : (Error, int) -> void) : RedisTransaction;

    function zscore(key : string, member : string) : RedisTransaction;
    function zscore(key : string, member : string, callback : (Error) -> void) : RedisTransaction;
    function zscore(key : string, member : string, callback : (Error, string) -> void) : RedisTransaction;

    function zunionstore(destination : string, numkeys : int, params : string[]) : RedisTransaction;
    function zunionstore(destination : string, numkeys : int, params : string[], callback : (Error) -> void) : RedisTransaction;
    function zunionstore(destination : string, numkeys : int, params : string[], callback : (Error, int) -> void) : RedisTransaction;
}
