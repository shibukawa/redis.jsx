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
    static function createClient() : RedisClient;
    static function createClient(port : Nullable.<int>) : RedisClient;
    static function createClient(port : Nullable.<int>, host : Nullable.<string>) : RedisClient;
    static function createClient(port : Nullable.<int>, host : Nullable.<string>, options : Map.<variant>) : RedisClient;
} = '''
require('redis');
''';

native __fake__ class RedisClient extends EventEmitter
{

    function end() : void;

    function append(key : string, value : string) : void;
    function append(key : string, value : string, callback : (Error) -> void) : void;
    function append(key : string, value : string, callback : (Error, int) -> void) : void;
    function APPEND(key : string, value : string) : void;
    function APPEND(key : string, value : string, callback : (Error) -> void) : void;
    function APPEND(key : string, value : string, callback : (Error, int) -> void) : void;

    function auth (password : string, callback : (Error) -> void) : void;
    function auth (password : string, callback : (Error, string) -> void) : void;
    function AUTH (password : string, callback : (Error) -> void) : void;
    function AUTH (password : string, callback : (Error, string) -> void) : void;

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

    function bitop(operation : string, destkey : string, srckey : string[]) : void;
    function BITOP(operation : string, destkey : string, srckey : string[]) : void;
    function blpop() : void;
    function BLPOP() : void;
    function brpop() : void;
    function BRPOP() : void;
    function brpoplpush() : void;
    function BRPOPLPUSH() : void;
   /* function client kill() : void;
    function CLIENT kill() : void;
    function client list() : void;
    function CLIENT list() : void;
    function client getname() : void;
    function CLIENT getname() : void;
    function client setname() : void;
    function CLIENT setname() : void;
    function config get() : void;
    function CONFIG get() : void;
    function config set() : void;
    function CONFIG set() : void;
    function config resetstat() : void;
    function CONFIG resetstat() : void;*/
    function dbsize() : void;
    function DBSIZE() : void;
    /*function debug object() : void;
    function DEBUG object() : void;
    function debug segfault() : void;
    function DEBUG segfault() : void;*/

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
    function exec() : void;
    function EXEC() : void;

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

    function getbit() : void;
    function GETBIT() : void;
    function getrange() : void;
    function GETRANGE() : void;
    function getset() : void;
    function GETSET() : void;
    function hdel() : void;
    function HDEL() : void;
    function hexists() : void;
    function HEXISTS() : void;
    function hget() : void;
    function HGET() : void;
    function hgetall() : void;
    function HGETALL() : void;
    function hincrby() : void;
    function HINCRBY() : void;
    function hincrbyfloat() : void;
    function HINCRBYFLOAT() : void;
    function hkeys() : void;
    function HKEYS() : void;
    function hlen() : void;
    function HLEN() : void;
    function hmget() : void;
    function HMGET() : void;
    function hmset(hash : string, obj : Map.<string>) : void;
    function hmset(hash : string, obj : Map.<string>, callback : (Error) -> void) : void;
    function hmset(hash : string, obj : Map.<string>, callback : (Error, string) -> void) : void;
    function HMSET(hash : string, obj : Map.<string>) : void;
    function HMSET(hash : string, obj : Map.<string>, callback : (Error) -> void) : void;
    function HMSET(hash : string, obj : Map.<string>, callback : (Error, string) -> void) : void;
    function hset() : void;
    function HSET() : void;
    function hsetnx() : void;
    function HSETNX() : void;
    function hvals() : void;
    function HVALS() : void;

    function incr(key : string) : void;
    function incr(key : string, callback : (Error) -> void) : void;
    function incr(key : string, callback : (Error, int) -> void) : void;
    function INCR(key : string) : void;
    function INCR(key : string, callback : (Error) -> void) : void;
    function INCR(key : string, callback : (Error, int) -> void) : void;

    function incrby(key : string, increment : int) : void;
    function incrby(key : string, increment : int, callback : (Error) -> void) : void;
    function incrby(key : string, increment : int, callback : (Error, string) -> void) : void;
    function INCRBY(key : string, increment : int) : void;
    function INCRBY(key : string, increment : int, callback : (Error) -> void) : void;
    function INCRBY(key : string, increment : int, callback : (Error, string) -> void) : void;

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
    function lindex() : void;
    function LINDEX() : void;
    function linsert() : void;
    function LINSERT() : void;
    function llen() : void;
    function LLEN() : void;
    function lpop() : void;
    function LPOP() : void;
    function lpush() : void;
    function LPUSH() : void;
    function lpushx() : void;
    function LPUSHX() : void;
    function lrange() : void;
    function LRANGE() : void;
    function lrem() : void;
    function LREM() : void;
    function lset() : void;
    function LSET() : void;
    function ltrim() : void;
    function LTRIM() : void;

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

    function msetnx() : void;
    function MSETNX() : void;
    function multi() : void;
    function MULTI() : void;
    function object() : void;
    function OBJECT() : void;

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
    function psetex() : void;
    function PSETEX() : void;
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

    function rpop() : void;
    function RPOP() : void;
    function rpoplpush() : void;
    function RPOPLPUSH() : void;
    function rpush() : void;
    function RPUSH() : void;
    function rpushx() : void;
    function RPUSHX() : void;
    function sadd() : void;
    function SADD() : void;
    function save() : void;
    function SAVE() : void;
    function scard() : void;
    function SCARD() : void;
    /*function script exists() : void;
    function SCRIPT exists() : void;
    function script flush() : void;
    function SCRIPT flush() : void;
    function script kill() : void;
    function SCRIPT kill() : void;
    function script load() : void;
    function SCRIPT load() : void;*/
    function sdiff() : void;
    function SDIFF() : void;
    function sdiffstore() : void;
    function SDIFFSTORE() : void;
    function select() : void;
    function SELECT() : void;

    function set(key : string, value : string) : void;
    function set(key : string, value : string, callback : (Error) -> void) : void;
    function set(key : string, value : string, callback : (Error, string) -> void) : void;
    function SET(key : string, value : string) : void;
    function SET(key : string, value : string, callback : (Error) -> void) : void;
    function SET(key : string, value : string, callback : (Error, string) -> void) : void;

    function setbit() : void;
    function SETBIT() : void;

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
    function SETEX(key : string, value : string, callback : (Error, int) -> void) : void;

    function setrange() : void;
    function SETRANGE() : void;
    function shutdown() : void;
    function SHUTDOWN() : void;
    function sinter() : void;
    function SINTER() : void;
    function sinterstore() : void;
    function SINTERSTORE() : void;
    function sismember() : void;
    function SISMEMBER() : void;
    function slaveof() : void;
    function SLAVEOF() : void;
    function slowlog() : void;
    function SLOWLOG() : void;
    function smembers() : void;
    function SMEMBERS() : void;
    function smove() : void;
    function SMOVE() : void;
    function sort() : void;
    function SORT() : void;
    function spop() : void;
    function SPOP() : void;
    function srandmember() : void;
    function SRANDMEMBER() : void;
    function srem() : void;
    function SREM() : void;

    function strlen(key : string, callback : (Error, int) -> void) : void;
    function STRLEN(key : string, callback : (Error, int) -> void) : void;

    function subscribe() : void;
    function SUBSCRIBE() : void;
    function sunion() : void;
    function SUNION() : void;
    function sunionstore() : void;
    function SUNIONSTORE() : void;
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
    function zadd() : void;
    function ZADD() : void;
    function zcard() : void;
    function ZCARD() : void;
    function zcount() : void;
    function ZCOUNT() : void;
    function zincrby() : void;
    function ZINCRBY() : void;
    function zinterstore() : void;
    function ZINTERSTORE() : void;
    function zrange() : void;
    function ZRANGE() : void;
    function zrangebyscore() : void;
    function ZRANGEBYSCORE() : void;
    function zrank() : void;
    function ZRANK() : void;
    function zrem() : void;
    function ZREM() : void;
    function zremrangebyrank() : void;
    function ZREMRANGEBYRANK() : void;
    function zremrangebyscore() : void;
    function ZREMRANGEBYSCORE() : void;
    function zrevrange() : void;
    function ZREVRANGE() : void;
    function zrevrangebyscore() : void;
    function ZREVRANGEBYSCORE() : void;
    function zrevrank() : void;
    function ZREVRANK() : void;
    function zscore() : void;
    function ZSCORE() : void;
    function zunionstore() : void;
    function ZUNIONSTORE() : void;
}
