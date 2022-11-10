"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.upload = exports.listObjects = exports.listBuckets = exports.createBucket = exports.connect = void 0;
var ck = require('ckey');
var S3 = require('aws-sdk/clients/s3');
var fs = require('fs');
var path = require('path');
function connect() {
    var region = ck.AWS_BUCKET_REGION;
    var accessKeyId = ck.AWS_ACCESS_KEY_ID;
    var secretAccessKey = ck.AWS_SECRET_ACCESS_KEY;
    var s3 = new S3({
        region: region,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
    });
    return s3;
}
exports.connect = connect;
function createBucket(bucketName) {
    return __awaiter(this, void 0, void 0, function () {
        var response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, connect().createBucket({
                            Bucket: bucketName
                        }).promise()];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.Location];
                case 2:
                    e_1 = _a.sent();
                    console.log('error', e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createBucket = createBucket;
function listBuckets() {
    return __awaiter(this, void 0, void 0, function () {
        var response, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, connect().listBuckets().promise()];
                case 1:
                    response = _a.sent();
                    console.log("BUCKETS:");
                    console.log(response.Buckets);
                    return [2 /*return*/, response.Buckets];
                case 2:
                    e_2 = _a.sent();
                    console.log('error', e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.listBuckets = listBuckets;
function listObjects(bucket) {
    return __awaiter(this, void 0, void 0, function () {
        var response, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, connect().listObjectsV2({
                            Bucket: bucket
                        }).promise()];
                case 1:
                    response = _a.sent();
                    console.log("Objects in bucket " + bucket + ":");
                    console.log(response);
                    return [2 /*return*/, response];
                case 2:
                    e_3 = _a.sent();
                    console.log('error', e_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.listObjects = listObjects;
function upload(bucket, file) {
    return __awaiter(this, void 0, void 0, function () {
        var uploadParams, fileStream, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    uploadParams = { Bucket: bucket, Key: "", Body: "" };
                    fileStream = fs.createReadStream(file);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    fileStream.on('error', function (err) {
                        console.log('File Error', err);
                    });
                    uploadParams.Body = fileStream;
                    uploadParams.Key = path.basename(file);
                    return [4 /*yield*/, connect().upload(uploadParams, function (data) {
                            console.log("Upload Success", data.Location);
                        }).promise()];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.Location];
                case 3:
                    error_1 = _a.sent();
                    console.log('error', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.upload = upload;