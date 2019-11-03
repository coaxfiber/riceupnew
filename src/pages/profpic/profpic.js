var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { GlobalProvider } from '../../providers/global/global';
import { Camera } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the ProfpicPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProfpicPage = /** @class */ (function () {
    function ProfpicPage(http, loadingCtrl, domSanitizer, camera, transfer, global) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.domSanitizer = domSanitizer;
        this.camera = camera;
        this.transfer = transfer;
        this.global = global;
        this.fileUrl = null;
        this.imageData = '';
        if (global.user.photo == '') {
            this.base64Image = 'assets/imgs/no-profile-image.jpg';
        }
        else {
            this.imageData = global.user.photo;
            this.base64Image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + global.user.photo);
        }
        this.fname = global.user.fname;
        this.mname = global.user.mname;
        this.lname = global.user.lname;
        this.suffix = global.user.suffix;
        this.address = global.user.address;
    }
    ProfpicPage.prototype.upload = function () {
        var _this = this;
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 250,
            targetHeight: 250,
            allowEdit: true
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            _this.imageData = imageData;
            _this.base64Image = _this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;charset=utf-8;base64,' + imageData);
        }, function (err) {
            // Handle error
        });
    };
    ProfpicPage.prototype.updateinfo = function () {
        var _this = this;
        if (this.fname == '' || this.lname == '' || this.address == '') {
            this.global.presentAlert("All fields with * are required!");
        }
        else {
            this.loading = this.loadingCtrl.create({
                content: '',
            });
            this.loading.present();
            var header = new Headers();
            header.append("Accept", "application/json");
            header.append("Content-Type", "application/x-www-form-urlencoded");
            var option = new RequestOptions({ headers: header });
            var urlSearchParams = new URLSearchParams();
            urlSearchParams.append('email', this.global.user.email);
            urlSearchParams.append('fname', this.fname);
            urlSearchParams.append('mname', this.mname);
            urlSearchParams.append('lname', this.lname);
            urlSearchParams.append('address', this.address);
            urlSearchParams.append('suffix', this.suffix);
            urlSearchParams.append('photo', this.imageData);
            urlSearchParams.append('pass', 'updateinfo');
            var body = urlSearchParams.toString();
            this.http.post(this.global.api, body, option)
                .map(function (response) { return response.json(); })
                .subscribe(function (res) {
                console.log(res);
                _this.loading.dismissAll();
                if (res.message == 'found') {
                    _this.global.user = res.data;
                    _this.global.presentAlert("User information updated!");
                }
                else {
                    _this.global.presentAlert("Username or password are incorrect!");
                }
                //this.view.dismiss();
                //this.presentAlert("Registration Complete!");
            }, function (error) {
                _this.loading.dismissAll();
                _this.global.presentAlert("No Internet/Server Down!");
            });
        }
    };
    ProfpicPage = __decorate([
        Component({
            selector: 'page-profpic',
            templateUrl: 'profpic.html',
        }),
        __metadata("design:paramtypes", [Http,
            LoadingController,
            DomSanitizer,
            Camera,
            FileTransfer, GlobalProvider])
    ], ProfpicPage);
    return ProfpicPage;
}());
export { ProfpicPage };
//# sourceMappingURL=profpic.js.map