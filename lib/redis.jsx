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
    static function createClient(port : Nullable.<int>, host : Nullable.<string>, options : Map.<number>) : RedisClient;
    static function createClient(port : Nullable.<int>, host : Nullable.<string>, options : Map.<string>) : RedisClient;

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
    'blpop', 'brpop', 'del', 'eval', 'evalsha', 'hdel', 'hmset', 'lpush', 'msetnx', 'punsubscribe',
    'psubscribe', 'rpush', 'sadd', 'sdiff', 'sdiffstore', 'sinter', 'sinterstore', 'sort', 'srem',
    'subscribe', 'sunion', 'sunionstore', 'unsubscribe', 'zadd', 'zinterstore', 'zrangebyscore',
    'zrem', 'zrevrangebyscore', 'zunionstore'
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

    function end() : boolean;

    function auth(password : string, callback : (Error) -> void) : boolean;
    function auth(password : string, callback : (Error, string) -> void) : boolean;

    function multi() : RedisTransaction;
    function multi(commands : string[][]) : RedisTransaction;
    function multi(commands : Object[]) : RedisTransaction;

    function bgrewriteaof() : boolean;
    function bgrewriteaof(callback : (Error) -> void) : boolean;
    function bgrewriteaof(callback : (Error, string) -> void) : boolean;

    function bgsave() : boolean;
    function bgsave(callback : (Error) -> void) : boolean;
    function bgsave(callback : (Error, string) -> void) : boolean;

    function bitcount(key : string) : boolean;
    function bitcount(key : string, callback : (Error) -> void) : boolean;
    function bitcount(key : string, callback : (Error, int) -> void) : boolean;
    function bitcount(key : string, start : int) : boolean;
    function bitcount(key : string, start : int, callback : (Error) -> void) : boolean;
    function bitcount(key : string, start : int, callback : (Error, int) -> void) : boolean;
    function bitcount(key : string, start : int, end : int) : boolean;
    function bitcount(key : string, start : int, end : int, callback : (Error) -> void) : boolean;
    function bitcount(key : string, start : int, end : int, callback : (Error, int) -> void) : boolean;

    function bitop(operation : string, destkey : string, srckey : string, callback : (Error, int) -> void) : boolean;
    function bitop(operation : string, destkey : string, srckey : string[]) : boolean;
    function bitop(operation : string, destkey : string, srckey : string[], callback : (Error) -> void) : boolean;
    function bitop(operation : string, destkey : string, srckey : string[], callback : (Error, int) -> void) : boolean;

    function blpop(key : string, timeout : int, callback : (Error, string[]) -> void) : boolean;
    function blpop(keys : string[], timeout : int, callback : (Error, string[]) -> void) : boolean;

    function brpop(key : string, timeout : int, callback : (Error, string[]) -> void) : boolean;
    function brpop(keys : string[], timeout : int, callback : (Error, string[]) -> void) : boolean;

    function brpoplpush(source : string, destination : string, timeout : int, callback : (Error, string[]) -> void) : boolean;

    function clientgetname(callback : (Error, string) -> void) : boolean;

    function clientkill(ip_port : string) : boolean;
    function clientkill(ip_port : string, callback : (Error) -> void) : boolean;
    function clientkill(ip_port : string, callback : (Error, int) -> void) : boolean;

    function clientlist(callback : (Error, string[]) -> void) : boolean;

    function clientsetname(connectionname : string) : boolean;
    function clientsetname(connectionname : string, callback : (Error) -> void) : boolean;
    function clientsetname(connectionname : string, callback : (Error, int) -> void) : boolean;

    function configget(parameter : string, callback : (Error, string[]) -> void) : boolean;

    function configresetstat() : boolean;
    function configresetstat(callback : (Error) -> void) : boolean;
    function configresetstat(callback : (Error, string) -> void) : boolean;

    function configrewrite() : boolean;
    function configrewrite(callback : (Error) -> void) : boolean;
    function configrewrite(callback : (Error, string) -> void) : boolean;

    function configset(parameter : string, value : int) : boolean;
    function configset(parameter : string, value : int, callback : (Error) -> void) : boolean;
    function configset(parameter : string, value : int, callback : (Error, int) -> void) : boolean;
    function configset(parameter : string, value : string) : boolean;
    function configset(parameter : string, value : string, callback : (Error) -> void) : boolean;
    function configset(parameter : string, value : string, callback : (Error, int) -> void) : boolean;

    function dbsize(callback : (Error, int) -> void) : boolean;

    function decr(key : string) : boolean;
    function decr(key : string, callback : (Error) -> void) : boolean;
    function decr(key : string, callback : (Error, int) -> void) : boolean;

    function decrby(key : string, decrement : int) : boolean;
    function decrby(key : string, decrement : int, callback : (Error) -> void) : boolean;
    function decrby(key : string, decrement : int, callback : (Error, int) -> void) : boolean;

    function del(key : string) : boolean;
    function del(key : string, callback : (Error) -> void) : boolean;
    function del(key : string, callback : (Error, int) -> void) : boolean;
    function del(keys : string[]) : boolean;
    function del(keys : string[], callback : (Error) -> void) : boolean;
    function del(keys : string[], callback : (Error, int) -> void) : boolean;

    function dump(key : string, callback : (Error, string) -> void) : boolean;

    function echo(message : string) : boolean;
    function echo(message : string, callback : (Error) -> void) : boolean;
    function echo(message : string, callback : (Error, string) -> void) : boolean;

    function eval(script : string, numkeys : int) : boolean;
    function eval(script : string, numkeys : int, callback : (Error) -> void) : boolean;
    function eval(script : string, numkeys : int, callback : (Error, variant) -> void) : boolean;
    function eval(script : string, numkeys : int, callback : (Error, int) -> void) : boolean;
    function eval(script : string, numkeys : int, callback : (Error, string) -> void) : boolean;
    function eval(script : string, numkeys : int, callback : (Error, int[]) -> void) : boolean;
    function eval(script : string, numkeys : int, callback : (Error, string[]) -> void) : boolean;
    function eval(script : string, numkeys : int, keys_or_args : string[]) : boolean;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error) -> void) : boolean;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, variant) -> void) : boolean;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, int) -> void) : boolean;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, string) -> void) : boolean;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, int[]) -> void) : boolean;
    function eval(script : string, numkeys : int, keys_or_args : string[], callback : (Error, string[]) -> void) : boolean;
    function eval(script : string, numkeys : int, keys : string[], args : string[]) : boolean;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error) -> void) : boolean;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, variant) -> void) : boolean;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, int) -> void) : boolean;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, string) -> void) : boolean;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, int[]) -> void) : boolean;
    function eval(script : string, numkeys : int, keys : string[], args : string[], callback : (Error, string[]) -> void) : boolean;

    function evalsha(sha1 : string, numkeys : int) : boolean;
    function evalsha(sha1 : string, numkeys : int, callback : (Error) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, variant) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, int) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, string) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, int[]) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, callback : (Error, string[]) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[]) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, variant) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, int) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, string) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, int[]) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys_or_args : string[], callback : (Error, string[]) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[]) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, variant) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, int) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, string) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, int[]) -> void) : boolean;
    function evalsha(sha1 : string, numkeys : int, keys : string[], args : string[], callback : (Error, string[]) -> void) : boolean;

    function exists(key : string, callback : (Error, int) -> void) : boolean;

    function expire(key : string, seconds : int, value : string) : boolean;
    function expire(key : string, seconds : int, value : string, callback : (Error) -> void) : boolean;
    function expire(key : string, seconds : int, value : string, callback : (Error, int) -> void) : boolean;

    function expireat(key : string, timestamp : int, value : string) : boolean;
    function expireat(key : string, timestamp : int, value : string, callback : (Error) -> void) : boolean;
    function expireat(key : string, timestamp : int, value : string, callback : (Error, int) -> void) : boolean;

    function flushall() : boolean;
    function flushall(callback : (Error) -> void) : boolean;
    function flushall(callback : (Error, string) -> void) : boolean;

    function flushdb() : boolean;
    function flushdb(callback : (Error) -> void) : boolean;
    function flushdb(callback : (Error, string) -> void) : boolean;

    function get(key : string, callback : (Error, string) -> void) : boolean;

    function getbit(key : string, offset : int, callback : (Error, int) -> void) : boolean;

    function getrange(key : string, start : int, end : int, callback : (Error, string) -> void) : boolean;

    function getset(key : string, value : string, callback : (Error, string) -> void) : boolean;

    function hdel(key : string, field : string) : boolean;
    function hdel(key : string, field : string, callback : (Error) -> void) : boolean;
    function hdel(key : string, field : string, callback : (Error, int) -> void) : boolean;
    function hdel(key : string, fields : string[]) : boolean;
    function hdel(key : string, fields : string[], callback : (Error) -> void) : boolean;
    function hdel(key : string, fields : string[], callback : (Error, int) -> void) : boolean;

    function hexists(key : string, field : string) : boolean;
    function hexists(key : string, field : string, callback : (Error) -> void) : boolean;
    function hexists(key : string, field : string, callback : (Error, int) -> void) : boolean;

    function hget(key : string, field : string, callback : (Error, Nullable.<string>) -> void) : boolean;

    function hgetall(key : string, callback : (Error, Map.<string>) -> void) : boolean;

    function hincrby(key : string, field : string, increment : int) : boolean;
    function hincrby(key : string, field : string, increment : int, callback : (Error) -> void) : boolean;
    function hincrby(key : string, field : string, increment : int, callback : (Error, int) -> void) : boolean;

    function hincrbyfloat(key : string, field : string, increment : number) : boolean;
    function hincrbyfloat(key : string, field : string, increment : number, callback : (Error) -> void) : boolean;
    function hincrbyfloat(key : string, field : string, increment : number, callback : (Error, string) -> void) : boolean;

    function hkeys(key : string, callback : (Error, string[]) -> void) : boolean;

    function hlen(key : string, callback : (Error, int) -> void) : boolean;

    function hmget(keys : string, field : string[], callback : (Error, string[]) -> void) : boolean;

    function hmset(hash : string, obj : string[]) : boolean;
    function hmset(hash : string, obj : string[], callback : (Error) -> void) : boolean;
    function hmset(hash : string, obj : string[], callback : (Error, string) -> void) : boolean;
    function hmset(hash : string, obj : Map.<string>) : boolean;
    function hmset(hash : string, obj : Map.<string>, callback : (Error) -> void) : boolean;
    function hmset(hash : string, obj : Map.<string>, callback : (Error, string) -> void) : boolean;

    function hset(key : string, field : string, value : string) : boolean;
    function hset(key : string, field : string, value : string, callback : (Error) -> void) : boolean;
    function hset(key : string, field : string, value : string, callback : (Error, int) -> void) : boolean;
    function hset(key : string, field : string, value : number) : boolean;
    function hset(key : string, field : string, value : number, callback : (Error) -> void) : boolean;
    function hset(key : string, field : string, value : number, callback : (Error, int) -> void) : boolean;

    function hsetnx(key : string, field : string, value : string) : boolean;
    function hsetnx(key : string, field : string, value : string, callback : (Error) -> void) : boolean;
    function hsetnx(key : string, field : string, value : string, callback : (Error, int) -> void) : boolean;
    function hsetnx(key : string, field : string, value : number) : boolean;
    function hsetnx(key : string, field : string, value : number, callback : (Error) -> void) : boolean;
    function hsetnx(key : string, field : string, value : number, callback : (Error, int) -> void) : boolean;

    function hvals(key : string, callback : (Error, string[]) -> void) : boolean;

    function incr(key : string) : boolean;
    function incr(key : string, callback : (Error) -> void) : boolean;
    function incr(key : string, callback : (Error, int) -> void) : boolean;

    function incrby(key : string, increment : int) : boolean;
    function incrby(key : string, increment : int, callback : (Error) -> void) : boolean;
    function incrby(key : string, increment : int, callback : (Error, int) -> void) : boolean;

    function incrbyfloat(key : string, increment : number) : boolean;
    function incrbyfloat(key : string, increment : number, callback : (Error) -> void) : boolean;
    function incrbyfloat(key : string, increment : number, callback : (Error, string) -> void) : boolean;

    function info(callback : (Error, string[]) -> void) : boolean;
    function info(section : string, callback : (Error, string[]) -> void) : boolean;

    function keys(pattern : string, callback : (Error, string[]) -> void) : boolean;

    function lastsave(callback : (Error, int) -> int) : boolean;

    function lindex(key : string, value : string, callback : (Error, int) -> void) : boolean;

    function linsert(key : string, direction : string, pivot : string, value : string) : boolean;
    function linsert(key : string, direction : string, pivot : string, value : string, callback : (Error) -> void) : boolean;
    function linsert(key : string, direction : string, pivot : string, value : string, callback : (Error, int) -> void) : boolean;

    function llen(key : string, callback : (Error, int) -> void) : boolean;

    function lpop(key : string, callback : (Error, string[]) -> void) : boolean;
    function lpop(keys : string[], callback : (Error, string[]) -> void) : boolean;

    function lpush(key : string, value : string) : boolean;
    function lpush(key : string, value : string, callback : (Error) -> void) : boolean;
    function lpush(key : string, value : string, callback : (Error, int) -> void) : boolean;
    function lpush(key : string, values : string[]) : boolean;
    function lpush(key : string, values : string[], callback : (Error) -> void) : boolean;
    function lpush(key : string, values : string[], callback : (Error, int) -> void) : boolean;

    function lpushx(key : string, value : string) : boolean;
    function lpushx(key : string, value : string, callback : (Error) -> void) : boolean;
    function lpushx(key : string, value : string, callback : (Error, int) -> void) : boolean;

    function lrange(key : string, start : int, stop : int, callback : (Error, string[]) -> void) : boolean;

    function lrem(key : string, count : int, value : string) : boolean;
    function lrem(key : string, count : int, value : string, callback : (Error) -> void) : boolean;
    function lrem(key : string, count : int, value : string, callback : (Error, int) -> void) : boolean;

    function lset(key : string, index : int, value : string) : boolean;
    function lset(key : string, index : int, value : string, callback : (Error) -> void) : boolean;
    function lset(key : string, index : int, value : string, callback : (Error, string) -> void) : boolean;

    function ltrim(key : string, start : int, stop : int) : boolean;
    function ltrim(key : string, start : int, stop : int, callback : (Error) -> void) : boolean;
    function ltrim(key : string, start : int, stop : int, callback : (Error, string) -> void) : boolean;

    function mget(keys : string[], callback : (Error, string[]) -> void) : boolean;

    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string) : boolean;
    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string, callback : (Error) -> void) : boolean;
    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string, callback : (Error, string) -> void) : boolean;

    function monitor() : boolean;
    function monitor(callback : (Error) -> void) : boolean;
    function monitor(callback : (Error, string) -> void) : boolean;

    function move(key : string, db : string) : boolean;
    function move(key : string, db : string, callback : (Error) -> void) : boolean;
    function move(key : string, db : string, callback : (Error, int) -> void) : boolean;

    function mset(items : variant[]) : boolean;
    function mset(items : variant[], callback : (Error) -> void) : boolean;
    function mset(items : variant[], callback : (Error, string) -> void) : boolean;
    function mset(items : string[]) : boolean;
    function mset(items : string[], callback : (Error) -> void) : boolean;
    function mset(items : string[], callback : (Error, string) -> void) : boolean;

    function msetnx(items : string[]) : boolean;
    function msetnx(items : string[], callback : (Error) -> void) : boolean;
    function msetnx(items : string[], value : string, callback : (Error, int) -> void) : boolean;

    function objectrefcount(key : string, callback : (Error, int) -> void) : boolean;
    function objectencoding(key : string, callback : (Error, string) -> void) : boolean;
    function objectidletime(key : string, callback : (Error, int) -> void) : boolean;

    function persist(key : string) : boolean;
    function persist(key : string, callback : (Error) -> void) : boolean;
    function persist(key : string, callback : (Error, int) -> void) : boolean;

    function pexpire(key : string, milliseconds : int, value : string) : boolean;
    function pexpire(key : string, milliseconds : int, value : string, callback : (Error) -> void) : boolean;
    function pexpire(key : string, milliseconds : int, value : string, callback : (Error, int) -> void) : boolean;

    function pexpireat(key : string, millisecondsTimestamp : int, value : string) : boolean;
    function pexpireat(key : string, millisecondsTimestamp : int, value : string, callback : (Error) -> void) : boolean;
    function pexpireat(key : string, millisecondsTimestamp : int, value : string, callback : (Error, int) -> void) : boolean;

    function ping(callback : (Error, string) -> void) : boolean;

    function psetex(key : string, milliseconds : int, value : string) : boolean;
    function psetex(key : string, milliseconds : int, value : string, callback : (Error) -> void) : boolean;
    function psetex(key : string, milliseconds : int, value : string, callback : (Error, string) -> void) : boolean;

    function psubscribe(pattern : string) : boolean;
    function psubscribe(patterns : string[]) : boolean;

    function pttl(key : string, callback : (Error, int) -> void) : boolean;

    function publish(channel : string, message : string) : boolean;
    function publish(channel : string, message : string, callback : (Error) -> void) : boolean;
    function publish(channel : string, message : string, callback : (Error, int) -> void) : boolean;

    function pubsubchannels(callback : (Error, string[]) -> void) : boolean;
    function pubsubchannels(pattern : string, callback : (Error, string[]) -> void) : boolean;

    function pubsubnumsub(channel : string, callback : (Error, string[]) -> void) : boolean;
    function pubsubnumsub(channels : string[], callback : (Error, string[]) -> void) : boolean;

    function pubsubnumpat(callback : (Error, int) -> void) : boolean;

    function punsubscribe() : boolean;
    function punsubscribe(pattern : string) : boolean;
    function punsubscribe(patterns : string[]) : boolean;

    function quit() : boolean;
    function quit(callback : (Error) -> void) : boolean;
    function quit(callback : (Error, string) -> void) : boolean;

    function randomkey(callback : (Error, Nullable.<string>) -> void) : boolean;

    function rename(key : string, newkey : string) : boolean;
    function rename(key : string, newkey : string, callback : (Error) -> void) : boolean;
    function rename(key : string, newkey : string, callback : (Error, string) -> void) : boolean;

    function renamenx(key : string, newkey : string) : boolean;
    function renamenx(key : string, newkey : string, callback : (Error) -> void) : boolean;
    function renamenx(key : string, newkey : string, callback : (Error, int) -> void) : boolean;

    function restore(key : string, ttl : int, serializedValue : string) : boolean;
    function restore(key : string, ttl : int, serializedValue : string, callback : (Error) -> void) : boolean;
    function restore(key : string, ttl : int, serializedValue : string, callback : (Error, string) -> void) : boolean;

    function rpop(key : string, callback : (Error, string[]) -> void) : boolean;
    function rpop(keys : string[], callback : (Error, string[]) -> void) : boolean;

    function rpoplpush(source : string, destination : string, callback : (Error, string[]) -> void) : boolean;

    function rpush(key : string, value : string) : boolean;
    function rpush(key : string, value : string, callback : (Error) -> void) : boolean;
    function rpush(key : string, value : string, callback : (Error, int) -> void) : boolean;
    function rpush(key : string, values : string[]) : boolean;
    function rpush(key : string, values : string[], callback : (Error) -> void) : boolean;
    function rpush(key : string, values : string[], callback : (Error, int) -> void) : boolean;

    function rpushx(key : string, value : string) : boolean;
    function rpushx(key : string, value : string, callback : (Error) -> void) : boolean;
    function rpushx(key : string, value : string, callback : (Error, int) -> void) : boolean;

    function sadd(key : string, member : number) : boolean;
    function sadd(key : string, member : number, callback : (Error) -> void) : boolean;
    function sadd(key : string, member : number, callback : (Error, int) -> void) : boolean;
    function sadd(key : string, members : number[]) : boolean;
    function sadd(key : string, members : number[], callback : (Error) -> void) : boolean;
    function sadd(key : string, members : number[], callback : (Error, int) -> void) : boolean;
    function sadd(key : string, member : string) : boolean;
    function sadd(key : string, member : string, callback : (Error) -> void) : boolean;
    function sadd(key : string, member : string, callback : (Error, int) -> void) : boolean;
    function sadd(key : string, members : string[]) : boolean;
    function sadd(key : string, members : string[], callback : (Error) -> void) : boolean;
    function sadd(key : string, members : string[], callback : (Error, int) -> void) : boolean;

    function save() : boolean;
    function save(callback : (Error) -> void) : boolean;
    function save(callback : (Error, string) -> void) : boolean;

    function scard(key : string, callback : (Error, int) -> void) : boolean;

    function scriptexists(script : string, callback : (Error, int[]) -> void) : boolean;
    function scriptexists(scripts : string[], callback : (Error, int[]) -> void) : boolean;

    function scriptflush(callback : () -> void) : boolean;
    function scriptflush(callback : (Error) -> void) : boolean;
    function scriptflush(callback : (Error, string) -> void) : boolean;

    function scriptkill(callback : () -> void) : boolean;
    function scriptkill(callback : (Error) -> void) : boolean;
    function scriptkill(callback : (Error, string) -> void) : boolean;

    function scriptload(script : string, callback : (Error, string) -> void) : boolean;

    function sdiff(key : string, set : string, callback : (Error, string[]) -> void) : boolean;
    function sdiff(key : string, sets : string[], callback : (Error, string[]) -> void) : boolean;

    function sdiffstore(destination : string, key : string, set : string) : boolean;
    function sdiffstore(destination : string, key : string, set : string, callback : (Error) -> void) : boolean;
    function sdiffstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : boolean;
    function sdiffstore(destination : string, key : string, sets : string[]) : boolean;
    function sdiffstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : boolean;
    function sdiffstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : boolean;

    function select(index : int) : boolean;
    function select(index : int, callback : (Error) -> void) : boolean;
    function select(index : int, callback : (Error, string) -> void) : boolean;

    function set(key : string, value : string) : boolean;
    function set(key : string, value : string, callback : (Error) -> void) : boolean;
    function set(key : string, value : string, callback : (Error, string) -> void) : boolean;
    function set(key : string, value : Buffer) : boolean;
    function set(key : string, value : Buffer, callback : (Error) -> void) : boolean;
    function set(key : string, value : Buffer, callback : (Error, string) -> void) : boolean;
    function set(key : string, value : number) : boolean;
    function set(key : string, value : number, callback : (Error) -> void) : boolean;
    function set(key : string, value : number, callback : (Error, string) -> void) : boolean;

    function setbit(key : string, offset : int, value : int) : boolean;
    function setbit(key : string, offset : int, value : int, callback : (Error) -> void) : boolean;
    function setbit(key : string, offset : int, value : int, callback : (Error, int) -> void) : boolean;

    function setex(key : string, seconds : int, value : string) : boolean;
    function setex(key : string, seconds : int, value : string, callback : (Error) -> void) : boolean;
    function setex(key : string, seconds : int, value : string, callback : (Error, string) -> void) : boolean;

    function setnx(key : string, value : string) : boolean;
    function setnx(key : string, value : string, callback : (Error) -> void) : boolean;
    function setnx(key : string, value : string, callback : (Error, int) -> void) : boolean;

    function setrange(key : string, offset : int, value : string) : boolean;
    function setrange(key : string, offset : int, value : string, callback : (Error) -> void) : boolean;
    function setrange(key : string, offset : int, value : string, callback : (Error, int) -> void) : boolean;

    function shutdown() : boolean;
    function shutdown(callback : (Error) -> void) : boolean;
    function shutdown(callback : (Error, string) -> void) : boolean;
    function shutdown(param : string) : boolean;
    function shutdown(param : string, callback : (Error) -> void) : boolean;
    function shutdown(param : string, callback : (Error, string) -> void) : boolean;

    function sinter(key : string, set : string, callback : (Error, string[]) -> void) : boolean;
    function sinter(key : string, sets : string[], callback : (Error, string[]) -> void) : boolean;

    function sinterstore(destination : string, key : string, set : string) : boolean;
    function sinterstore(destination : string, key : string, set : string, callback : (Error) -> void) : boolean;
    function sinterstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : boolean;
    function sinterstore(destination : string, key : string, sets : string[]) : boolean;
    function sinterstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : boolean;
    function sinterstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : boolean;

    function sismember(key : string, member : string, callback : (Error, int) -> void) : boolean;

    function slaveof(host : string, port : int) : boolean;
    function slaveof(host : string, port : int, callback : (Error) -> void) : boolean;
    function slaveof(host : string, port : int, callback : (Error, string) -> void) : boolean;

    //function slowlog() : boolean;

    function smembers(key : string, callback : (Error, string[]) -> void) : boolean;

    function smove(destination : string, key : string, member : string) : boolean;
    function smove(destination : string, key : string, member : string, callback : (Error) -> void) : boolean;
    function smove(destination : string, key : string, member : string, callback : (Error, int) -> void) : boolean;

    function sort(key : string) : boolean;
    function sort(key : string, callback : (Error) -> void) : boolean;
    function sort(key : string, callback : (Error, string[]) -> void) : boolean;
    function sort(key : string, params : string[]) : boolean;
    function sort(key : string, params : string[], callback : (Error) -> void) : boolean;
    function sort(key : string, params : string[], callback : (Error, string[]) -> void) : boolean;

    function spop(key : string) : boolean;
    function spop(key : string, callback : (Error) -> void) : boolean;
    function spop(key : string, callback : (Error, string) -> void) : boolean;

    function srandmember(key : string, callback : (Error, string) -> void) : boolean;
    function srandmember(key : string, count : int, callback : (Error, string[]) -> void) : boolean;

    function srem(key : string, member : string) : boolean;
    function srem(key : string, member : string, callback : (Error) -> void) : boolean;
    function srem(key : string, member : string, callback : (Error, int) -> void) : boolean;
    function srem(key : string, members : string[]) : boolean;
    function srem(key : string, members : string[], callback : (Error) -> void) : boolean;
    function srem(key : string, members : string[], callback : (Error, int) -> void) : boolean;

    function strlen(key : string, callback : (Error, int) -> void) : boolean;

    function subscribe(channel : string) : boolean;
    function subscribe(channels : string[]) : boolean;

    function sunion(key : string, set : string, callback : (Error, string[]) -> void) : boolean;
    function sunion(key : string, sets : string[], callback : (Error, string[]) -> void) : boolean;

    function sunionstore(destination : string, key : string, set : string) : boolean;
    function sunionstore(destination : string, key : string, set : string, callback : (Error) -> void) : boolean;
    function sunionstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : boolean;
    function sunionstore(destination : string, key : string, sets : string[]) : boolean;
    function sunionstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : boolean;
    function sunionstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : boolean;

    function time(callback : (Error, string[]) -> void) : boolean;

    function ttl(key : string, callback : (Error, int) -> void) : boolean;

    function type(key : string, callback : (Error, string) -> void) : boolean;

    function unsubscribe() : boolean;
    function unsubscribe(channel : string) : boolean;
    function unsubscribe(channels : string[]) : boolean;

    function zadd(key : string, score : int, member : string) : boolean;
    function zadd(key : string, score : int, member : string, callback : (Error) -> void) : boolean;
    function zadd(key : string, score : int, member : string, callback : (Error, int) -> void) : boolean;
    function zadd(key : string, members : variant[]) : boolean;
    function zadd(key : string, members : variant[], callback : (Error) -> void) : boolean;
    function zadd(key : string, members : variant[], callback : (Error, int) -> void) : boolean;

    function zcard(key : string, callback : (Error, int) -> void) : boolean;

    function zcount(key : string, min : int, max : int, callback : (Error, int) -> void) : boolean;

    function zincrby(key : string, increment : int, member : string) : boolean;
    function zincrby(key : string, increment : int, member : string, callback : (Error) -> void) : boolean;
    function zincrby(key : string, increment : int, member : string, callback : (Error, string) -> void) : boolean;

    function zinterstore(destination : string, numkeys : int, params : string[]) : boolean;
    function zinterstore(destination : string, numkeys : int, params : string[], callback : (Error) -> void) : boolean;
    function zinterstore(destination : string, numkeys : int, params : string[], callback : (Error, int) -> void) : boolean;

    function zrange(key : string, start : int, end : int, callback : (Error, string[]) -> void) : boolean;
    function zrange(key : string, start : int, end : int, withscore : string, callback : (Error, variant[]) -> void) : boolean;

    function zrangebyscore(key : string, min : int, max : int, callback : (Error, string[]) -> void) : boolean;
    function zrangebyscore(key : string, min : int, max : int, option : variant[], callback : (Error, variant[]) -> void) : boolean;
    function zrangebyscore(key : string, min : int, max : int, option : string[], callback : (Error, variant[]) -> void) : boolean;
    function zrangebyscore(key : string, min : string, max : int, callback : (Error, string[]) -> void) : boolean;
    function zrangebyscore(key : string, min : string, max : int, option : variant[], callback : (Error, variant[]) -> void) : boolean;
    function zrangebyscore(key : string, min : string, max : int, option : string[], callback : (Error, variant[]) -> void) : boolean;
    function zrangebyscore(key : string, min : int, max : string, callback : (Error, string[]) -> void) : boolean;
    function zrangebyscore(key : string, min : int, max : string, option : variant[], callback : (Error, variant[]) -> void) : boolean;
    function zrangebyscore(key : string, min : int, max : string, option : string[], callback : (Error, variant[]) -> void) : boolean;
    function zrangebyscore(key : string, min : string, max : string, callback : (Error, string[]) -> void) : boolean;
    function zrangebyscore(key : string, min : string, max : string, option : variant[], callback : (Error, variant[]) -> void) : boolean;
    function zrangebyscore(key : string, min : string, max : string, option : string[], callback : (Error, variant[]) -> void) : boolean;

    function zrank(key : string, member : string, callback : (Error, int) -> void) : boolean;

    function zrem(key : string, member : string) : boolean;
    function zrem(key : string, member : string[]) : boolean;
    function zrem(key : string, member : string, callback : (Error) -> void) : boolean;
    function zrem(key : string, member : string[], callback : (Error) -> void) : boolean;
    function zrem(key : string, member : string, callback : (Error, int) -> void) : boolean;
    function zrem(key : string, member : string[], callback : (Error, int) -> void) : boolean;

    function zremrangebyrank(key : string, start : int, stop : int) : boolean;
    function zremrangebyrank(key : string, start : int, stop : int, callback : (Error) -> void) : boolean;
    function zremrangebyrank(key : string, start : int, stop : int, callback : (Error, int) -> void) : boolean;

    function zremrangebyscore(key : string, min : int, max : int) : boolean;
    function zremrangebyscore(key : string, min : int, max : int, callback : (Error) -> void) : boolean;
    function zremrangebyscore(key : string, min : int, max : int, callback : (Error, int) -> void) : boolean;

    function zrevrange(key : string, start : int, end : int, callback : (Error, string[]) -> void) : boolean;
    function zrevrange(key : string, start : int, end : int, withscore : string, callback : (Error, variant[]) -> void) : boolean;

    function zrevrangebyscore(key : string, min : int, max : int, callback : (Error, string[]) -> void) : boolean;
    function zrevrangebyscore(key : string, min : int, max : int, option : variant[], callback : (Error, variant[]) -> void) : boolean;
    function zrevrangebyscore(key : string, min : int, max : int, option : string[], callback : (Error, variant[]) -> void) : boolean;
    function zrevrangebyscore(key : string, min : string, max : int, callback : (Error, string[]) -> void) : boolean;
    function zrevrangebyscore(key : string, min : string, max : int, option : variant[], callback : (Error, variant[]) -> void) : boolean;
    function zrevrangebyscore(key : string, min : string, max : int, option : string[], callback : (Error, variant[]) -> void) : boolean;
    function zrevrangebyscore(key : string, min : int, max : string, callback : (Error, string[]) -> void) : boolean;
    function zrevrangebyscore(key : string, min : int, max : string, option : variant[], callback : (Error, variant[]) -> void) : boolean;
    function zrevrangebyscore(key : string, min : int, max : string, option : string[], callback : (Error, variant[]) -> void) : boolean;
    function zrevrangebyscore(key : string, min : string, max : string, callback : (Error, string[]) -> void) : boolean;
    function zrevrangebyscore(key : string, min : string, max : string, option : variant[], callback : (Error, variant[]) -> void) : boolean;
    function zrevrangebyscore(key : string, min : string, max : string, option : string[], callback : (Error, variant[]) -> void) : boolean;

    function zrevrank(key : string, member : string, callback : (Error, int) -> void) : boolean;

    function zscore(key : string, member : string, callback : (Error, string) -> void) : boolean;

    function zunionstore(destination : string, numkeys : int, params : string[]) : boolean;
    function zunionstore(destination : string, numkeys : int, params : string[], callback : (Error) -> void) : boolean;
    function zunionstore(destination : string, numkeys : int, params : string[], callback : (Error, int) -> void) : boolean;
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
    function hgetall(key : string, callback : (Error, Map.<string>) -> void) : RedisTransaction;

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
    function hset(key : string, field : string, value : number) : RedisTransaction;
    function hset(key : string, field : string, value : number, callback : (Error) -> void) : RedisTransaction;
    function hset(key : string, field : string, value : number, callback : (Error, int) -> void) : RedisTransaction;

    function hsetnx(key : string, field : string, value : string) : RedisTransaction;
    function hsetnx(key : string, field : string, value : string, callback : (Error) -> void) : RedisTransaction;
    function hsetnx(key : string, field : string, value : string, callback : (Error, int) -> void) : RedisTransaction;
    function hsetnx(key : string, field : string, value : number) : RedisTransaction;
    function hsetnx(key : string, field : string, value : number, callback : (Error) -> void) : RedisTransaction;
    function hsetnx(key : string, field : string, value : number, callback : (Error, int) -> void) : RedisTransaction;

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

    function sadd(key : string, member : number) : RedisTransaction;
    function sadd(key : string, member : number, callback : (Error) -> void) : RedisTransaction;
    function sadd(key : string, member : number, callback : (Error, int) -> void) : RedisTransaction;
    function sadd(key : string, members : number[]) : RedisTransaction;
    function sadd(key : string, members : number[], callback : (Error) -> void) : RedisTransaction;
    function sadd(key : string, members : number[], callback : (Error, int) -> void) : RedisTransaction;
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
    function set(key : string, value : Buffer) : RedisTransaction;
    function set(key : string, value : Buffer, callback : (Error) -> void) : RedisTransaction;
    function set(key : string, value : Buffer, callback : (Error, string) -> void) : RedisTransaction;
    function set(key : string, value : number) : RedisTransaction;
    function set(key : string, value : number, callback : (Error) -> void) : RedisTransaction;
    function set(key : string, value : number, callback : (Error, string) -> void) : RedisTransaction;

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
