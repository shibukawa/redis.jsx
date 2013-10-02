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
} = '''
require('redis');

(function () {
var RedisClient = require('redis').RedisClient;
var twoWordsCommands = [
    'script exists', 'script kill', 'script flush', 'script load',
    'client kill', 'client list', 'client getname', 'client setname',
    'config get', 'config rewrite', 'config set', 'config resetstat',
    'debug object', 'debug segfault',
    'object refcount', 'object encoding', 'object idletime'];

twoWordsCommands.forEach(function (command) {
    var words = command.split(' ');
    var lowerCaseCommand = words.join('');
    var upperCaseCommand = [words[0].toUpperCase(), words[1].toUpperCase()].join('');
    RedisClient.prototype[lowerCaseCommand] = function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(words[1]);
        return this.send_command(words[0], args);
    };
    RedisClient.prototype[upperCaseCommand] = RedisClient.prototype[lowerCaseCommand];
});
})();
''';

abstract native __fake__ class RedisClient extends EventEmitter // implements RedisCommands
{
    function end() : void;

    function auth (password : string, callback : (Error) -> void) : void;
    function auth (password : string, callback : (Error, string) -> void) : void;
    function AUTH (password : string, callback : (Error) -> void) : void;
    function AUTH (password : string, callback : (Error, string) -> void) : void;

    //function multi() : RedisCommands;
    //function MULTI() : RedisCommands;

/*abstract native __fake__ class RedisTransaction implements RedisCommands
{
    function exec (callback : (Error) -> void) : void;
    function exec (callback : (Error, string[]) -> void) : void;
    function EXEC (callback : (Error) -> void) : void;
    function EXEC (callback : (Error, string[]) -> void) : void;
}*/

    function append(key : string, value : string) : void;
    function append(key : string, value : string, callback : (Error) -> void) : void;
    function append(key : string, value : string, callback : (Error, int) -> void) : void;
    function APPEND(key : string, value : string) : void;
    function APPEND(key : string, value : string, callback : (Error) -> void) : void;
    function APPEND(key : string, value : string, callback : (Error, int) -> void) : void;

    function bgrewriteaof() : void;
    function bgrewriteaof(callback : (Error) -> void) : void;
    function bgrewriteaof(callback : (Error, string) -> void) : void;
    function BGREWRITEAOF() : void;
    function BGREWRITEAOF(callback : (Error) -> void) : void;
    function BGREWRITEAOF(callback : (Error, string) -> void) : void;

    function bgsave() : void;
    function bgsave(callback : (Error) -> void) : void;
    function bgsave(callback : (Error, string) -> void) : void;
    function BGSAVE() : void;
    function BGSAVE(callback : (Error) -> void) : void;
    function BGSAVE(callback : (Error, string) -> void) : void;

    function bitcount(key : string) : void;
    function bitcount(key : string, callback : (Error) -> void) : void;
    function bitcount(key : string, callback : (Error, int) -> void) : void;
    function bitcount(key : string, start : int) : void;
    function bitcount(key : string, start : int, callback : (Error) -> void) : void;
    function bitcount(key : string, start : int, callback : (Error, int) -> void) : void;
    function bitcount(key : string, start : int, end : int) : void;
    function bitcount(key : string, start : int, end : int, callback : (Error) -> void) : void;
    function bitcount(key : string, start : int, end : int, callback : (Error, int) -> void) : void;
    function BITCOUNT(key : string) : void;
    function BITCOUNT(key : string, callback : (Error) -> void) : void;
    function BITCOUNT(key : string, callback : (Error, int) -> void) : void;
    function BITCOUNT(key : string, start : int) : void;
    function BITCOUNT(key : string, start : int, callback : (Error) -> void) : void;
    function BITCOUNT(key : string, start : int, callback : (Error, int) -> void) : void;
    function BITCOUNT(key : string, start : int, end : int) : void;
    function BITCOUNT(key : string, start : int, end : int, callback : (Error) -> void) : void;
    function BITCOUNT(key : string, start : int, end : int, callback : (Error, int) -> void) : void;

    function bitop(operation : string, destkey : string, srckey : string) : void;
    function bitop(operation : string, destkey : string, srckey : string, callback : (Error) -> void) : void;
    function bitop(operation : string, destkey : string, srckey : string, callback : (Error, int) -> void) : void;
    function bitop(operation : string, destkey : string, srckey : string[]) : void;
    function bitop(operation : string, destkey : string, srckey : string[], callback : (Error) -> void) : void;
    function bitop(operation : string, destkey : string, srckey : string[], callback : (Error, int) -> void) : void;

    function blpop(key : string, timeout : int, callback : (Error, string[]) -> void) : void;
    function blpop(keys : string[], timeout : int, callback : (Error, string[]) -> void) : void;
    function BLPOP(key : string, timeout : int, callback : (Error, string[]) -> void) : void;
    function BLPOP(keys : string[], timeout : int, callback : (Error, string[]) -> void) : void;

    function brpop(key : string, timeout : int, callback : (Error, string[]) -> void) : void;
    function brpop(keys : string[], timeout : int, callback : (Error, string[]) -> void) : void;
    function BRPOP(key : string, timeout : int, callback : (Error, string[]) -> void) : void;
    function BRPOP(keys : string[], timeout : int, callback : (Error, string[]) -> void) : void;

    function brpoplpush(source : string, destination : string, timeout : int, callback : (Error, string[]) -> void) : void;
    function BRPOPLPUSH(source : string, destination : string, timeout : int, callback : (Error, string[]) -> void) : void;

    function clientkill() : void;
    function CLIENTKILL() : void;
    function clientlist(callback : (Error, string[]) -> void) : void;
    function CLIENTLIST(callback : (Error, string[]) -> void) : void;
    function clientgetname() : void;
    function CLIENTGETNAME() : void;
    function clientsetname() : void;
    function CLIENTSETNAME() : void;
    function configget() : void;
    function CONFIGGET() : void;
    function configset() : void;
    function CONFIGSET() : void;
    function configresetstat() : void;
    function CONFIGRESETSTAT() : void;
    function dbsize() : void;
    function DBSIZE() : void;
    function debugobject() : void;
    function DEBUGOBJECT() : void;
    function debugsegfault() : void;
    function DEBUGSEGFAULT() : void;

    function decr(key : string) : void;
    function decr(key : string, callback : (Error) -> void) : void;
    function decr(key : string, callback : (Error, int) -> void) : void;
    function DECR(key : string) : void;
    function DECR(key : string, callback : (Error) -> void) : void;
    function DECR(key : string, callback : (Error, int) -> void) : void;

    function decrby(key : string, decrement : int) : void;
    function decrby(key : string, decrement : int, callback : (Error) -> void) : void;
    function decrby(key : string, decrement : int, callback : (Error, int) -> void) : void;
    function DECRBY(key : string, decrement : int) : void;
    function DECRBY(key : string, decrement : int, callback : (Error) -> void) : void;
    function DECRBY(key : string, decrement : int, callback : (Error, int) -> void) : void;

    function del(key : string) : void;
    function del(key : string, callback : (Error) -> void) : void;
    function del(key : string, callback : (Error, int) -> void) : void;
    function del(keys : string[]) : void;
    function del(keys : string[], callback : (Error) -> void) : void;
    function del(keys : string[], callback : (Error, int) -> void) : void;
    function DEL(key : string) : void;
    function DEL(key : string, callback : (Error) -> void) : void;
    function DEL(key : string, callback : (Error, int) -> void) : void;
    function DEL(keys : string[]) : void;
    function DEL(keys : string[], callback : (Error) -> void) : void;
    function DEL(keys : string[], callback : (Error, int) -> void) : void;

    function discard() : void;
    function DISCARD() : void;

    function dump(key : string, callback : (Error, string) -> void) : void;
    function DUMP(key : string, callback : (Error, string) -> void) : void;

    function echo() : void;
    function ECHO() : void;
    function eval() : void;
    function EVAL() : void;
    function evalsha() : void;
    function EVALSHA() : void;
    //function exec() : void;
    //function EXEC() : void;

    function exists(key : string) : void;
    function exists(key : string, callback : (Error) -> void) : void;
    function exists(key : string, callback : (Error, int) -> void) : void;
    function EXISTS(key : string) : void;
    function EXISTS(key : string, callback : (Error) -> void) : void;
    function EXISTS(key : string, callback : (Error, int) -> void) : void;

    function expire(key : string, seconds : int, value : string) : void;
    function expire(key : string, seconds : int, value : string, callback : (Error) -> void) : void;
    function expire(key : string, seconds : int, value : string, callback : (Error, int) -> void) : void;
    function EXPIRE(key : string, seconds : int, value : string) : void;
    function EXPIRE(key : string, seconds : int, value : string, callback : (Error) -> void) : void;
    function EXPIRE(key : string, seconds : int, value : string, callback : (Error, int) -> void) : void;

    function expireat(key : string, timestamp : int, value : string) : void;
    function expireat(key : string, timestamp : int, value : string, callback : (Error) -> void) : void;
    function expireat(key : string, timestamp : int, value : string, callback : (Error, int) -> void) : void;
    function EXPIREAT(key : string, timestamp : int, value : string) : void;
    function EXPIREAT(key : string, timestamp : int, value : string, callback : (Error) -> void) : void;
    function EXPIREAT(key : string, timestamp : int, value : string, callback : (Error, int) -> void) : void;

    function flushall() : void;
    function FLUSHALL() : void;
    function flushdb() : void;
    function FLUSHDB() : void;

    function get(key : string, callback : (Error, string) -> void) : void;
    function GET(key : string, callback : (Error, string) -> void) : void;

    function getbit(key : string, offset : int, callback : (Error, int) -> void) : void;
    function GETBIT(key : string, offset : int, callback : (Error, int) -> void) : void;

    function getrange(key : string, start : int, end : int, callback : (Error, string) -> void) : void;
    function GETRANGE(key : string, start : int, end : int, callback : (Error, string) -> void) : void;

    function getset(key : string, value : string, callback : (Error, string) -> void) : void;
    function GETSET(key : string, value : string, callback : (Error, string) -> void) : void;

    function hdel(key : string, field : string) : void;
    function hdel(key : string, field : string, callback : (Error) -> void) : void;
    function hdel(key : string, field : string, callback : (Error, int) -> void) : void;
    function hdel(key : string, fields : string[]) : void;
    function hdel(key : string, fields : string[], callback : (Error) -> void) : void;
    function hdel(key : string, fields : string[], callback : (Error, int) -> void) : void;
    function HDEL(key : string, field : string) : void;
    function HDEL(key : string, field : string, callback : (Error) -> void) : void;
    function HDEL(key : string, field : string, callback : (Error, int) -> void) : void;
    function HDEL(key : string, fields : string[]) : void;
    function HDEL(key : string, fields : string[], callback : (Error) -> void) : void;
    function HDEL(key : string, fields : string[], callback : (Error, int) -> void) : void;

    function hexists(key : string, field : string) : void;
    function hexists(key : string, field : string, callback : (Error) -> void) : void;
    function hexists(key : string, field : string, callback : (Error, int) -> void) : void;
    function HEXISTS(key : string, field : string) : void;
    function HEXISTS(key : string, field : string, callback : (Error) -> void) : void;
    function HEXISTS(key : string, field : string, callback : (Error, int) -> void) : void;

    function hget(key : string, field : string, callback : (Error, Nullable.<string>) -> void) : void;
    function HGET(key : string, field : string, callback : (Error, Nullable.<string>) -> void) : void;

    function hgetall(key : string, callback : (Error, string[]) -> void) : void;
    function HGETALL(key : string, callback : (Error, string[]) -> void) : void;

    function hincrby(key : string, field : string, increment : int) : void;
    function hincrby(key : string, field : string, increment : int, callback : (Error) -> void) : void;
    function hincrby(key : string, field : string, increment : int, callback : (Error, int) -> void) : void;
    function HINCRBY(key : string, field : string, increment : int) : void;
    function HINCRBY(key : string, field : string, increment : int, callback : (Error) -> void) : void;
    function HINCRBY(key : string, field : string, increment : int, callback : (Error, int) -> void) : void;

    function hincrbyfloat(key : string, field : string, increment : number) : void;
    function hincrbyfloat(key : string, field : string, increment : number, callback : (Error) -> void) : void;
    function hincrbyfloat(key : string, field : string, increment : number, callback : (Error, string) -> void) : void;
    function HINCRBYFLOAT(key : string, field : string, increment : number) : void;
    function HINCRBYFLOAT(key : string, field : string, increment : number, callback : (Error) -> void) : void;
    function HINCRBYFLOAT(key : string, field : string, increment : number, callback : (Error, string) -> void) : void;

    function hkeys(key : string, callback : (Error, string[]) -> void) : void;
    function HKEYS(key : string, callback : (Error, string[]) -> void) : void;

    function hlen(key : string, callback : (Error, int) -> void) : void;
    function HLEN(key : string, callback : (Error, int) -> void) : void;

    function hmget(keys : string, field : string[], callback : (Error, string[]) -> void) : void;
    function HMGET(keys : string, field : string[], callback : (Error, string[]) -> void) : void;

    function hmset(hash : string, obj : string[]) : void;
    function hmset(hash : string, obj : string[], callback : (Error) -> void) : void;
    function hmset(hash : string, obj : string[], callback : (Error, string) -> void) : void;
    function HMSET(hash : string, obj : string[]) : void;
    function HMSET(hash : string, obj : string[], callback : (Error) -> void) : void;
    function HMSET(hash : string, obj : string[], callback : (Error, string) -> void) : void;
    function hmset(hash : string, obj : Map.<string>) : void;
    function hmset(hash : string, obj : Map.<string>, callback : (Error) -> void) : void;
    function hmset(hash : string, obj : Map.<string>, callback : (Error, string) -> void) : void;
    function HMSET(hash : string, obj : Map.<string>) : void;
    function HMSET(hash : string, obj : Map.<string>, callback : (Error) -> void) : void;
    function HMSET(hash : string, obj : Map.<string>, callback : (Error, string) -> void) : void;

    function hset(key : string, field : string, value : string) : void;
    function hset(key : string, field : string, value : string, callback : (Error) -> void) : void;
    function hset(key : string, field : string, value : string, callback : (Error, int) -> void) : void;
    function HSET(key : string, field : string, value : string) : void;
    function HSET(key : string, field : string, value : string, callback : (Error) -> void) : void;
    function HSET(key : string, field : string, value : string, callback : (Error, int) -> void) : void;

    function hsetnx(key : string, field : string, value : string) : void;
    function hsetnx(key : string, field : string, value : string, callback : (Error) -> void) : void;
    function hsetnx(key : string, field : string, value : string, callback : (Error, int) -> void) : void;
    function HSETNX(key : string, field : string, value : string) : void;
    function HSETNX(key : string, field : string, value : string, callback : (Error) -> void) : void;
    function HSETNX(key : string, field : string, value : string, callback : (Error, int) -> void) : void;

    function hvals(key : string, callback : (Error, string[]) -> void) : void;
    function HVALS(key : string, callback : (Error, string[]) -> void) : void;

    function incr(key : string) : void;
    function incr(key : string, callback : (Error) -> void) : void;
    function incr(key : string, callback : (Error, int) -> void) : void;
    function INCR(key : string) : void;
    function INCR(key : string, callback : (Error) -> void) : void;
    function INCR(key : string, callback : (Error, int) -> void) : void;

    function incrby(key : string, increment : int) : void;
    function incrby(key : string, increment : int, callback : (Error) -> void) : void;
    function incrby(key : string, increment : int, callback : (Error, int) -> void) : void;
    function INCRBY(key : string, increment : int) : void;
    function INCRBY(key : string, increment : int, callback : (Error) -> void) : void;
    function INCRBY(key : string, increment : int, callback : (Error, int) -> void) : void;

    function incrbyfloat(key : string, increment : number) : void;
    function incrbyfloat(key : string, increment : number, callback : (Error) -> void) : void;
    function incrbyfloat(key : string, increment : number, callback : (Error, string) -> void) : void;
    function INCRBYFLOAT(key : string, increment : number) : void;
    function INCRBYFLOAT(key : string, increment : number, callback : (Error) -> void) : void;
    function INCRBYFLOAT(key : string, increment : number, callback : (Error, string) -> void) : void;

    function info() : void;
    function INFO() : void;

    function keys(pattern : string, callback : (Error, string[]) -> void) : void;
    function KEYS(pattern : string, callback : (Error, string[]) -> void) : void;

    function lastsave() : void;
    function LASTSAVE() : void;

    function lindex(key : string, value : string, callback : (Error, int) -> void) : void;
    function LINDEX(key : string, value : string, callback : (Error, int) -> void) : void;

    function linsert(key : string, direction : string, pivot : string, value : string) : void;
    function linsert(key : string, direction : string, pivot : string, value : string, callback : (Error) -> void) : void;
    function linsert(key : string, direction : string, pivot : string, value : string, callback : (Error, int) -> void) : void;
    function LINSERT(key : string, direction : string, pivot : string, value : string) : void;
    function LINSERT(key : string, direction : string, pivot : string, value : string, callback : (Error) -> void) : void;
    function LINSERT(key : string, direction : string, pivot : string, value : string, callback : (Error, int) -> void) : void;

    function llen(key : string, callback : (Error, int) -> void) : void;
    function LLEN(key : string, callback : (Error, int) -> void) : void;

    function lpop(key : string, callback : (Error, string[]) -> void) : void;
    function lpop(keys : string[], callback : (Error, string[]) -> void) : void;
    function LPOP(key : string, callback : (Error, string[]) -> void) : void;
    function LPOP(keys : string[], callback : (Error, string[]) -> void) : void;

    function lpush(key : string, value : string) : void;
    function lpush(key : string, value : string, callback : (Error) -> void) : void;
    function lpush(key : string, value : string, callback : (Error, int) -> void) : void;
    function lpush(key : string, values : string[]) : void;
    function lpush(key : string, values : string[], callback : (Error) -> void) : void;
    function lpush(key : string, values : string[], callback : (Error, int) -> void) : void;
    function LPUSH(key : string, value : string) : void;
    function LPUSH(key : string, value : string, callback : (Error) -> void) : void;
    function LPUSH(key : string, value : string, callback : (Error, int) -> void) : void;
    function LPUSH(key : string, values : string[]) : void;
    function LPUSH(key : string, values : string[], callback : (Error) -> void) : void;
    function LPUSH(key : string, values : string[], callback : (Error, int) -> void) : void;

    function lpushx(key : string, value : string) : void;
    function lpushx(key : string, value : string, callback : (Error) -> void) : void;
    function lpushx(key : string, value : string, callback : (Error, int) -> void) : void;
    function LPUSHX(key : string, value : string) : void;
    function LPUSHX(key : string, value : string, callback : (Error) -> void) : void;
    function LPUSHX(key : string, value : string, callback : (Error, int) -> void) : void;

    function lrange(key : string, start : int, stop : int, callback : (Error, string[]) -> void) : void;
    function LRANGE(key : string, start : int, stop : int, callback : (Error, string[]) -> void) : void;

    function lrem(key : string, count : int, value : string) : void;
    function lrem(key : string, count : int, value : string, callback : (Error) -> void) : void;
    function lrem(key : string, count : int, value : string, callback : (Error, int) -> void) : void;
    function LREM(key : string, count : int, value : string) : void;
    function LREM(key : string, count : int, value : string, callback : (Error) -> void) : void;
    function LREM(key : string, count : int, value : string, callback : (Error, int) -> void) : void;

    function lset(key : string, index : int, value : string) : void;
    function lset(key : string, index : int, value : string, callback : (Error) -> void) : void;
    function lset(key : string, index : int, value : string, callback : (Error, string) -> void) : void;
    function LSET(key : string, index : int, value : string) : void;
    function LSET(key : string, index : int, value : string, callback : (Error) -> void) : void;
    function LSET(key : string, index : int, value : string, callback : (Error, string) -> void) : void;

    function ltrim(key : string, start : int, stop : int) : void;
    function ltrim(key : string, start : int, stop : int, callback : (Error) -> void) : void;
    function ltrim(key : string, start : int, stop : int, callback : (Error, string) -> void) : void;
    function LTRIM(key : string, start : int, stop : int) : void;
    function LTRIM(key : string, start : int, stop : int, callback : (Error) -> void) : void;
    function LTRIM(key : string, start : int, stop : int, callback : (Error, string) -> void) : void;

    function mget(keys : string[], callback : (Error, string[]) -> void) : void;
    function MGET(keys : string[], callback : (Error, string[]) -> void) : void;

    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string) : void;
    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string, callback : (Error) -> void) : void;
    function migrate(host : string, port : int, destinationdb : string, timeout : int, command : string, callback : (Error, string) -> void) : void;
    function MIGRATE(host : string, port : int, destinationdb : string, timeout : int, command : string) : void;
    function MIGRATE(host : string, port : int, destinationdb : string, timeout : int, command : string, callback : (Error) -> void) : void;
    function MIGRATE(host : string, port : int, destinationdb : string, timeout : int, command : string, callback : (Error, string) -> void) : void;

    function monitor() : void;
    function MONITOR() : void;

    function move(key : string, db : string) : void;
    function move(key : string, db : string, callback : (Error) -> void) : void;
    function move(key : string, db : string, callback : (Error, int) -> void) : void;
    function MOVE(key : string, db : string) : void;
    function MOVE(key : string, db : string, callback : (Error) -> void) : void;
    function MOVE(key : string, db : string, callback : (Error, int) -> void) : void;

    function mset(items : string[]) : void;
    function mset(items : string[], callback : (Error) -> void) : void;
    function mset(items : string[], value : string, callback : (Error, string) -> void) : void;
    function MSET(items : string[], value : string) : void;
    function MSET(items : string[], value : string, callback : (Error) -> void) : void;
    function MSET(items : string[], value : string, callback : (Error, string) -> void) : void;

    function msetnx(items : string[]) : void;
    function msetnx(items : string[], callback : (Error) -> void) : void;
    function msetnx(items : string[], value : string, callback : (Error, int) -> void) : void;
    function MSETNX(items : string[], value : string) : void;
    function MSETNX(items : string[], value : string, callback : (Error) -> void) : void;
    function MSETNX(items : string[], value : string, callback : (Error, int) -> void) : void;

    function objectrefcount(key : string, callback : (Error, int) -> void) : void;
    function OBJECTREFCOUNT(key : string, callback : (Error, int) -> void) : void;
    function objectencoding(key : string, callback : (Error, string) -> void) : void;
    function OBJECTENCODING(key : string, callback : (Error, string) -> void) : void;
    function objectidletime(key : string, callback : (Error, int) -> void) : void;
    function OBJECTIDLETIME(key : string, callback : (Error, int) -> void) : void;

    function persist(key : string) : void;
    function persist(key : string, callback : (Error) -> void) : void;
    function persist(key : string, callback : (Error, int) -> void) : void;
    function PERSIST(key : string) : void;
    function PERSIST(key : string, callback : (Error) -> void) : void;
    function PERSIST(key : string, callback : (Error, int) -> void) : void;

    function pexpire(key : string, milliseconds : int, value : string) : void;
    function pexpire(key : string, milliseconds : int, value : string, callback : (Error) -> void) : void;
    function pexpire(key : string, milliseconds : int, value : string, callback : (Error, int) -> void) : void;
    function PEXPIRE(key : string, milliseconds : int, value : string) : void;
    function PEXPIRE(key : string, milliseconds : int, value : string, callback : (Error) -> void) : void;
    function PEXPIRE(key : string, milliseconds : int, value : string, callback : (Error, int) -> void) : void;

    function pexpireat(key : string, millisecondsTimestamp : int, value : string) : void;
    function pexpireat(key : string, millisecondsTimestamp : int, value : string, callback : (Error) -> void) : void;
    function pexpireat(key : string, millisecondsTimestamp : int, value : string, callback : (Error, int) -> void) : void;
    function PEXPIREAT(key : string, millisecondsTimestamp : int, value : string) : void;
    function PEXPIREAT(key : string, millisecondsTimestamp : int, value : string, callback : (Error) -> void) : void;
    function PEXPIREAT(key : string, millisecondsTimestamp : int, value : string, callback : (Error, int) -> void) : void;

    function ping() : void;
    function PING() : void;

    function psetex(key : string, milliseconds : int, value : string) : void;
    function psetex(key : string, milliseconds : int, value : string, callback : (Error) -> void) : void;
    function psetex(key : string, milliseconds : int, value : string, callback : (Error, string) -> void) : void;
    function PSETEX(key : string, milliseconds : int, value : string) : void;
    function PSETEX(key : string, milliseconds : int, value : string, callback : (Error) -> void) : void;
    function PSETEX(key : string, milliseconds : int, value : string, callback : (Error, string) -> void) : void;

    function psubscribe() : void;
    function PSUBSCRIBE() : void;

    function pttl(key : string, callback : (Error, int) -> void) : void;
    function PTTL(key : string, callback : (Error, int) -> void) : void;

    function publish() : void;
    function PUBLISH() : void;
    function punsubscribe() : void;
    function PUNSUBSCRIBE() : void;
    function quit() : void;
    function QUIT() : void;

    function randomkey(callback : (Error, Nullable.<string>) -> void) : void;
    function RANDOMKEY(callback : (Error, Nullable.<string>) -> void) : void;

    function rename(key : string, newkey : string) : void;
    function rename(key : string, newkey : string, callback : (Error) -> void) : void;
    function rename(key : string, newkey : string, callback : (Error, string) -> void) : void;
    function RENAME(key : string, newkey : string) : void;
    function RENAME(key : string, newkey : string, callback : (Error) -> void) : void;
    function RENAME(key : string, newkey : string, callback : (Error, string) -> void) : void;

    function renamenx(key : string, newkey : string) : void;
    function renamenx(key : string, newkey : string, callback : (Error) -> void) : void;
    function renamenx(key : string, newkey : string, callback : (Error, int) -> void) : void;
    function RENAMENX(key : string, newkey : string) : void;
    function RENAMENX(key : string, newkey : string, callback : (Error) -> void) : void;
    function RENAMENX(key : string, newkey : string, callback : (Error, int) -> void) : void;

    function restore(key : string, ttl : int, serializedValue : string) : void;
    function restore(key : string, ttl : int, serializedValue : string, callback : (Error) -> void) : void;
    function restore(key : string, ttl : int, serializedValue : string, callback : (Error, string) -> void) : void;
    function RESTORE(key : string, ttl : int, serializedValue : string) : void;
    function RESTORE(key : string, ttl : int, serializedValue : string, callback : (Error) -> void) : void;
    function RESTORE(key : string, ttl : int, serializedValue : string, callback : (Error, string) -> void) : void;

    function rpop(key : string, callback : (Error, string[]) -> void) : void;
    function rpop(keys : string[], callback : (Error, string[]) -> void) : void;
    function RPOP(key : string, callback : (Error, string[]) -> void) : void;
    function RPOP(keys : string[], callback : (Error, string[]) -> void) : void;

    function rpoplpush(source : string, destination : string, callback : (Error, string[]) -> void) : void;
    function RPOPLPUSH(source : string, destination : string, callback : (Error, string[]) -> void) : void;

    function rpush(key : string, value : string) : void;
    function rpush(key : string, value : string, callback : (Error) -> void) : void;
    function rpush(key : string, value : string, callback : (Error, int) -> void) : void;
    function rpush(key : string, values : string[]) : void;
    function rpush(key : string, values : string[], callback : (Error) -> void) : void;
    function rpush(key : string, values : string[], callback : (Error, int) -> void) : void;
    function RPUSH(key : string, value : string) : void;
    function RPUSH(key : string, value : string, callback : (Error) -> void) : void;
    function RPUSH(key : string, value : string, callback : (Error, int) -> void) : void;
    function RPUSH(key : string, values : string[]) : void;
    function RPUSH(key : string, values : string[], callback : (Error) -> void) : void;
    function RPUSH(key : string, values : string[], callback : (Error, int) -> void) : void;

    function rpushx(key : string, value : string) : void;
    function rpushx(key : string, value : string, callback : (Error) -> void) : void;
    function rpushx(key : string, value : string, callback : (Error, int) -> void) : void;
    function RPUSHX(key : string, value : string) : void;
    function RPUSHX(key : string, value : string, callback : (Error) -> void) : void;
    function RPUSHX(key : string, value : string, callback : (Error, int) -> void) : void;

    function sadd(key : string, member : string) : void;
    function sadd(key : string, member : string, callback : (Error) -> void) : void;
    function sadd(key : string, member : string, callback : (Error, int) -> void) : void;
    function sadd(key : string, members : string[]) : void;
    function sadd(key : string, members : string[], callback : (Error) -> void) : void;
    function sadd(key : string, members : string[], callback : (Error, int) -> void) : void;
    function SADD(key : string, member : string) : void;
    function SADD(key : string, member : string, callback : (Error) -> void) : void;
    function SADD(key : string, member : string, callback : (Error, int) -> void) : void;
    function SADD(key : string, members : string[]) : void;
    function SADD(key : string, members : string[], callback : (Error) -> void) : void;
    function SADD(key : string, members : string[], callback : (Error, int) -> void) : void;

    function save() : void;
    function SAVE() : void;

    function scard(key : string, callback : (Error, int) -> void) : void;
    function SCARD(key : string, callback : (Error, int) -> void) : void;

    function scard() : void;
    function SCARD() : void;
    function scriptexists() : void;
    function SCRIPTEXISTS() : void;
    function scriptflush() : void;
    function SCRIPTFLUSH() : void;
    function scriptkill() : void;
    function SCRIPTKILL() : void;
    function scriptload() : void;
    function SCRIPTLOAD() : void;

    function sdiff(key : string, set : string, callback : (Error, string[]) -> void) : void;
    function sdiff(key : string, sets : string[], callback : (Error, string[]) -> void) : void;
    function SDIFF(key : string, set : string, callback : (Error, string[]) -> void) : void;
    function SDIFF(key : string, sets : string[], callback : (Error, string[]) -> void) : void;

    function sdiffstore(destination : string, key : string, set : string) : void;
    function sdiffstore(destination : string, key : string, set : string, callback : (Error) -> void) : void;
    function sdiffstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : void;
    function sdiffstore(destination : string, key : string, sets : string[]) : void;
    function sdiffstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : void;
    function sdiffstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : void;
    function SDIFFSTORE(destination : string, key : string, set : string) : void;
    function SDIFFSTORE(destination : string, key : string, set : string, callback : (Error) -> void) : void;
    function SDIFFSTORE(destination : string, key : string, set : string, callback : (Error, int) -> void) : void;
    function SDIFFSTORE(destination : string, key : string, sets : string[]) : void;
    function SDIFFSTORE(destination : string, key : string, sets : string[], callback : (Error) -> void) : void;
    function SDIFFSTORE(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : void;

    function select() : void;
    function SELECT() : void;

    function set(key : string, value : string) : void;
    function set(key : string, value : string, callback : (Error) -> void) : void;
    function set(key : string, value : string, callback : (Error, string) -> void) : void;
    function SET(key : string, value : string) : void;
    function SET(key : string, value : string, callback : (Error) -> void) : void;
    function SET(key : string, value : string, callback : (Error, string) -> void) : void;

    function setbit(key : string, offset : int, value : int) : void;
    function setbit(key : string, offset : int, value : int, callback : (Error) -> void) : void;
    function setbit(key : string, offset : int, value : int, callback : (Error, int) -> void) : void;
    function SETBIT(key : string, offset : int, value : int) : void;
    function SETBIT(key : string, offset : int, value : int, callback : (Error) -> void) : void;
    function SETBIT(key : string, offset : int, value : int, callback : (Error, int) -> void) : void;

    function setex(key : string, seconds : int, value : string) : void;
    function setex(key : string, seconds : int, value : string, callback : (Error) -> void) : void;
    function setex(key : string, seconds : int, value : string, callback : (Error, string) -> void) : void;
    function SETEX(key : string, seconds : int, value : string) : void;
    function SETEX(key : string, seconds : int, value : string, callback : (Error) -> void) : void;
    function SETEX(key : string, seconds : int, value : string, callback : (Error, string) -> void) : void;

    function setnx(key : string, value : string) : void;
    function setnx(key : string, value : string, callback : (Error) -> void) : void;
    function setnx(key : string, value : string, callback : (Error, int) -> void) : void;
    function SETNX(key : string, value : string) : void;
    function SETNX(key : string, value : string, callback : (Error) -> void) : void;
    function SETNX(key : string, value : string, callback : (Error, int) -> void) : void;

    function setrange(key : string, offset : int, value : string) : void;
    function setrange(key : string, offset : int, value : string, callback : (Error) -> void) : void;
    function setrange(key : string, offset : int, value : string, callback : (Error, int) -> void) : void;
    function SETRANGE(key : string, offset : int, value : string) : void;
    function SETRANGE(key : string, offset : int, value : string, callback : (Error) -> void) : void;
    function SETRANGE(key : string, offset : int, value : string, callback : (Error, int) -> void) : void;

    function shutdown() : void;
    function SHUTDOWN() : void;

    function sinter(key : string, set : string, callback : (Error, string[]) -> void) : void;
    function sinter(key : string, sets : string[], callback : (Error, string[]) -> void) : void;
    function SINTER(key : string, set : string, callback : (Error, string[]) -> void) : void;
    function SINTER(key : string, sets : string[], callback : (Error, string[]) -> void) : void;

    function sintertore(destination : string, key : string, set : string) : void;
    function sinterstore(destination : string, key : string, set : string, callback : (Error) -> void) : void;
    function sinterstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : void;
    function sinterstore(destination : string, key : string, sets : string[]) : void;
    function sinterstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : void;
    function sinterstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : void;
    function SINTERTORE(destination : string, key : string, set : string) : void;
    function SINTERSTORE(destination : string, key : string, set : string, callback : (Error) -> void) : void;
    function SINTERSTORE(destination : string, key : string, set : string, callback : (Error, int) -> void) : void;
    function SINTERSTORE(destination : string, key : string, sets : string[]) : void;
    function SINTERSTORE(destination : string, key : string, sets : string[], callback : (Error) -> void) : void;
    function SINTERSTORE(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : void;

    function sismember(key : string, member : string, callback : (Error, int) -> void) : void;
    function SISMEMBER(key : string, member : string, callback : (Error, int) -> void) : void;

    function slaveof() : void;
    function SLAVEOF() : void;
    function slowlog() : void;
    function SLOWLOG() : void;

    function smembers(key : string, callback : (Error, string[]) -> void) : void;
    function SMEMBERS(key : string, callback : (Error, string[]) -> void) : void;

    function smove(destination : string, key : string, member : string) : void;
    function smove(destination : string, key : string, member : string, callback : (Error) -> void) : void;
    function smove(destination : string, key : string, member : string, callback : (Error, int) -> void) : void;
    function SMOVE(destination : string, key : string, member : string) : void;
    function SMOVE(destination : string, key : string, member : string, callback : (Error) -> void) : void;
    function SMOVE(destination : string, key : string, member : string, callback : (Error, int) -> void) : void;

    function sort(key : string) : void;
    function sort(key : string, callback : (Error) -> void) : void;
    function sort(key : string, callback : (Error, string[]) -> void) : void;
    function sort(key : string, params : string[]) : void;
    function sort(key : string, params : string[], callback : (Error) -> void) : void;
    function sort(key : string, params : string[], callback : (Error, string[]) -> void) : void;
    function SORT(key : string) : void;
    function SORT(key : string, callback : (Error) -> void) : void;
    function SORT(key : string, callback : (Error, string[]) -> void) : void;
    function SORT(key : string, params : string[]) : void;
    function SORT(key : string, params : string[], callback : (Error) -> void) : void;
    function SORT(key : string, params : string[], callback : (Error, string[]) -> void) : void;

    function spop(key : string, callback : (Error, string) -> void) : void;
    function SPOP(key : string, callback : (Error, string) -> void) : void;

    function srandmember(key : string, callback : (Error, string) -> void) : void;
    function srandmember(key : string, count : int, callback : (Error, string[]) -> void) : void;
    function SRANDMEMBER(key : string, callback : (Error, string) -> void) : void;
    function SRANDMEMBER(key : string, count : int, callback : (Error, string[]) -> void) : void;

    function srem(key : string, member : string) : void;
    function srem(key : string, member : string, callback : (Error) -> void) : void;
    function srem(key : string, member : string, callback : (Error, int) -> void) : void;
    function srem(key : string, members : string[]) : void;
    function srem(key : string, members : string[], callback : (Error) -> void) : void;
    function srem(key : string, members : string[], callback : (Error, int) -> void) : void;
    function SREM(key : string, member : string) : void;
    function SREM(key : string, member : string, callback : (Error) -> void) : void;
    function SREM(key : string, member : string, callback : (Error, int) -> void) : void;
    function SREM(key : string, members : string[]) : void;
    function SREM(key : string, members : string[], callback : (Error) -> void) : void;
    function SREM(key : string, members : string[], callback : (Error, int) -> void) : void;

    function strlen(key : string, callback : (Error, int) -> void) : void;
    function STRLEN(key : string, callback : (Error, int) -> void) : void;

    function subscribe() : void;
    function SUBSCRIBE() : void;


    function sunion(key : string, set : string, callback : (Error, string[]) -> void) : void;
    function sunion(key : string, sets : string[], callback : (Error, string[]) -> void) : void;
    function SUNION(key : string, set : string, callback : (Error, string[]) -> void) : void;
    function SUNION(key : string, sets : string[], callback : (Error, string[]) -> void) : void;

    function sunionstore(destination : string, key : string, set : string) : void;
    function sunionstore(destination : string, key : string, set : string, callback : (Error) -> void) : void;
    function sunionstore(destination : string, key : string, set : string, callback : (Error, int) -> void) : void;
    function sunionstore(destination : string, key : string, sets : string[]) : void;
    function sunionstore(destination : string, key : string, sets : string[], callback : (Error) -> void) : void;
    function sunionstore(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : void;
    function SUNIONSTORE(destination : string, key : string, set : string) : void;
    function SUNIONSTORE(destination : string, key : string, set : string, callback : (Error) -> void) : void;
    function SUNIONSTORE(destination : string, key : string, set : string, callback : (Error, int) -> void) : void;
    function SUNIONSTORE(destination : string, key : string, sets : string[]) : void;
    function SUNIONSTORE(destination : string, key : string, sets : string[], callback : (Error) -> void) : void;
    function SUNIONSTORE(destination : string, key : string, sets : string[], callback : (Error, int) -> void) : void;

    function sync() : void;
    function SYNC() : void;
    function time() : void;
    function TIME() : void;

    function ttl(key : string, callback : (Error, int) -> void) : void;
    function TTL(key : string, callback : (Error, int) -> void) : void;

    function type(key : string, callback : (Error, string) -> void) : void;
    function TYPE(key : string, callback : (Error, string) -> void) : void;

    function unsubscribe() : void;
    function UNSUBSCRIBE() : void;
    function unwatch() : void;
    function UNWATCH() : void;
    function watch() : void;
    function WATCH() : void;

    function zadd(key : string, score : int, member : string) : void;
    function zadd(key : string, score : int, member : string, callback : (Error) -> void) : void;
    function zadd(key : string, score : int, member : string, callback : (Error, int) -> void) : void;
    function zadd(key : string, members : variant[]) : void;
    function zadd(key : string, members : variant[], callback : (Error) -> void) : void;
    function zadd(key : string, members : variant[], callback : (Error, int) -> void) : void;
    function ZADD(key : string, score : int, member : string) : void;
    function ZADD(key : string, score : int, member : string, callback : (Error) -> void) : void;
    function ZADD(key : string, score : int, member : string, callback : (Error, int) -> void) : void;
    function ZADD(key : string, members : variant[]) : void;
    function ZADD(key : string, members : variant[], callback : (Error) -> void) : void;
    function ZADD(key : string, members : variant[], callback : (Error, int) -> void) : void;

    function zcard(key : string, callback : (Error, int) -> void) : void;
    function ZCARD(key : string, callback : (Error, int) -> void) : void;

    function zcount(key : string, min : int, max : int, callback : (Error, int) -> void) : void;
    function ZCOUNT(key : string, min : int, max : int, callback : (Error, int) -> void) : void;

    function zincrby(key : string, increment : int, member : string) : void;
    function zincrby(key : string, increment : int, member : string, callback : (Error) -> void) : void;
    function zincrby(key : string, increment : int, member : string, callback : (Error, string) -> void) : void;
    function ZINCRBY(key : string, increment : int, member : string) : void;
    function ZINCRBY(key : string, increment : int, member : string, callback : (Error) -> void) : void;
    function ZINCRBY(key : string, increment : int, member : string, callback : (Error, string) -> void) : void;

    function zinterstore(destination : string, numkeys : int, params : string[]) : void;
    function zinterstore(destination : string, numkeys : int, params : string[], callback : (Error) -> void) : void;
    function zinterstore(destination : string, numkeys : int, params : string[], callback : (Error, int) -> void) : void;
    function ZINTERSTORE(destination : string, numkeys : int, params : string[]) : void;
    function ZINTERSTORE(destination : string, numkeys : int, params : string[], callback : (Error) -> void) : void;
    function ZINTERSTORE(destination : string, numkeys : int, params : string[], callback : (Error, int) -> void) : void;

    function zrange(key : string, start : int, end : int, callback : (Error, string[]) -> void) : void;
    function zrange(key : string, start : int, end : int, withscore : string, callback : (Error, variant[]) -> void) : void;
    function ZRANGE(key : string, start : int, end : int, callback : (Error, string[]) -> void) : void;
    function ZRANGE(key : string, start : int, end : int, withscore : string, callback : (Error, variant[]) -> void) : void;

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
    function ZRANGEBYSCORE(key : string, min : int, max : int, callback : (Error, string[]) -> void) : void;
    function ZRANGEBYSCORE(key : string, min : int, max : int, option : variant[], callback : (Error, variant[]) -> void) : void;
    function ZRANGEBYSCORE(key : string, min : int, max : int, option : string[], callback : (Error, variant[]) -> void) : void;
    function ZRANGEBYSCORE(key : string, min : string, max : int, callback : (Error, string[]) -> void) : void;
    function ZRANGEBYSCORE(key : string, min : string, max : int, option : variant[], callback : (Error, variant[]) -> void) : void;
    function ZRANGEBYSCORE(key : string, min : string, max : int, option : string[], callback : (Error, variant[]) -> void) : void;
    function ZRANGEBYSCORE(key : string, min : int, max : string, callback : (Error, string[]) -> void) : void;
    function ZRANGEBYSCORE(key : string, min : int, max : string, option : variant[], callback : (Error, variant[]) -> void) : void;
    function ZRANGEBYSCORE(key : string, min : int, max : string, option : string[], callback : (Error, variant[]) -> void) : void;
    function ZRANGEBYSCORE(key : string, min : string, max : string, callback : (Error, string[]) -> void) : void;
    function ZRANGEBYSCORE(key : string, min : string, max : string, option : variant[], callback : (Error, variant[]) -> void) : void;
    function ZRANGEBYSCORE(key : string, min : string, max : string, option : string[], callback : (Error, variant[]) -> void) : void;

    function zrank(key : string, member : string, callback : (Error, int) -> void) : void;
    function ZRANK(key : string, member : string, callback : (Error, int) -> void) : void;

    function zrem(key : string, member : string) : void;
    function zrem(key : string, member : string[]) : void;
    function zrem(key : string, member : string, callback : (Error) -> void) : void;
    function zrem(key : string, member : string[], callback : (Error) -> void) : void;
    function zrem(key : string, member : string, callback : (Error, int) -> void) : void;
    function zrem(key : string, member : string[], callback : (Error, int) -> void) : void;
    function ZREM(key : string, member : string) : void;
    function ZREM(key : string, member : string[]) : void;
    function ZREM(key : string, member : string, callback : (Error) -> void) : void;
    function ZREM(key : string, member : string[], callback : (Error) -> void) : void;
    function ZREM(key : string, member : string, callback : (Error, int) -> void) : void;
    function ZREM(key : string, member : string[], callback : (Error, int) -> void) : void;

    function zremrangebyrank(key : string, start : int, stop : int) : void;
    function zremrangebyrank(key : string, start : int, stop : int, callback : (Error) -> void) : void;
    function zremrangebyrank(key : string, start : int, stop : int, callback : (Error, int) -> void) : void;
    function ZREMRANGEBYRANK(key : string, start : int, stop : int) : void;
    function ZREMRANGEBYRANK(key : string, start : int, stop : int, callback : (Error) -> void) : void;
    function ZREMRANGEBYRANK(key : string, start : int, stop : int, callback : (Error, int) -> void) : void;

    function zremrangebyscore(key : string, min : int, max : int) : void;
    function zremrangebyscore(key : string, min : int, max : int, callback : (Error) -> void) : void;
    function zremrangebyscore(key : string, min : int, max : int, callback : (Error, int) -> void) : void;
    function ZREMRANGEBYSCORE(key : string, min : int, max : int) : void;
    function ZREMRANGEBYSCORE(key : string, min : int, max : int, callback : (Error) -> void) : void;
    function ZREMRANGEBYSCORE(key : string, min : int, max : int, callback : (Error, int) -> void) : void;

    function zrevrange(key : string, start : int, end : int, callback : (Error, string[]) -> void) : void;
    function zrevrange(key : string, start : int, end : int, withscore : string, callback : (Error, variant[]) -> void) : void;
    function ZREVRANGE(key : string, start : int, end : int, callback : (Error, string[]) -> void) : void;
    function ZREVRANGE(key : string, start : int, end : int, withscore : string, callback : (Error, variant[]) -> void) : void;

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
    function ZREVRANGEBYSCORE(key : string, min : int, max : int, callback : (Error, string[]) -> void) : void;
    function ZREVRANGEBYSCORE(key : string, min : int, max : int, option : variant[], callback : (Error, variant[]) -> void) : void;
    function ZREVRANGEBYSCORE(key : string, min : int, max : int, option : string[], callback : (Error, variant[]) -> void) : void;
    function ZREVRANGEBYSCORE(key : string, min : string, max : int, callback : (Error, string[]) -> void) : void;
    function ZREVRANGEBYSCORE(key : string, min : string, max : int, option : variant[], callback : (Error, variant[]) -> void) : void;
    function ZREVRANGEBYSCORE(key : string, min : string, max : int, option : string[], callback : (Error, variant[]) -> void) : void;
    function ZREVRANGEBYSCORE(key : string, min : int, max : string, callback : (Error, string[]) -> void) : void;
    function ZREVRANGEBYSCORE(key : string, min : int, max : string, option : variant[], callback : (Error, variant[]) -> void) : void;
    function ZREVRANGEBYSCORE(key : string, min : int, max : string, option : string[], callback : (Error, variant[]) -> void) : void;
    function ZREVRANGEBYSCORE(key : string, min : string, max : string, callback : (Error, string[]) -> void) : void;
    function ZREVRANGEBYSCORE(key : string, min : string, max : string, option : variant[], callback : (Error, variant[]) -> void) : void;
    function ZREVRANGEBYSCORE(key : string, min : string, max : string, option : string[], callback : (Error, variant[]) -> void) : void;

    function zrevrank(key : string, member : string, callback : (Error, int) -> void) : void;
    function ZREVRANK(key : string, member : string, callback : (Error, int) -> void) : void;

    function zscore(key : string, member : string, callback : (Error, string) -> void) : void;
    function ZSCORE(key : string, member : string, callback : (Error, string) -> void) : void;

    function zunionstore(destination : string, numkeys : int, params : string[]) : void;
    function zunionstore(destination : string, numkeys : int, params : string[], callback : (Error) -> void) : void;
    function zunionstore(destination : string, numkeys : int, params : string[], callback : (Error, int) -> void) : void;
    function ZUNIONSTORE(destination : string, numkeys : int, params : string[]) : void;
    function ZUNIONSTORE(destination : string, numkeys : int, params : string[], callback : (Error) -> void) : void;
    function ZUNIONSTORE(destination : string, numkeys : int, params : string[], callback : (Error, int) -> void) : void;
}
