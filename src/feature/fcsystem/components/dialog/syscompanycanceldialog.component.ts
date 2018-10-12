import { Component, Input, OnInit } from '@angular/core';
import { ParentEditComponent } from 'fccomponent2';
import { FCEVENT } from 'fccomponent2/fc';
import { SyscompanyBusiness } from '../../business/syscompany.business';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from '@angular/core/src/render3/instructions';

/* 单位管理-撤销弹窗 */

@Component({
    selector: 'syscompanycanceldialog',
    template: `
<fc-layoutpanel class="templatefastposition ">
    <fc-layoutrow fcSpan="30" fccontent>
        <fc-tlbform [fcButtons]="tlbconfig" (fcEvent)="tlblistEvent($event)" fccontent1></fc-tlbform>
            <fc-layoutpanel fccontent2>
                <form fccontent>
                    <fc-layoutpanel fccontent id="basic-information">
                        <fc-title fcLabel="变更信息" fcBorder="bottom" fcWidth="96%" fcheader></fc-title>
                        <fc-layoutcol fcSpans="1,1" fccontent>
                            <fc-date [fcLabel]="'生效日期'"  [(ngModel)]="RevokeObj.REVOKE_SBEGIN_DATE" name="REVOKE_SBEGIN_DATE" fccontent1></fc-date>
                            <fc-text [fcLabel]="'变更文号'" [(ngModel)]="RevokeObj.REVOKE_FILE_NO" name="REVOKE_FILE_NO" fccontent2></fc-text>                            
                        </fc-layoutcol>
                        <fc-layoutcol fcSpans="1,0" fccontent >
                            <fc-textarea [fcLabel]="'变更原因'"  [(ngModel)]="RevokeObj.REVOKE_REASON" name="REVOKE_REASON" fcRow="2" fccontent1 class="line-col"></fc-textarea>                          
                        </fc-layoutcol>
                        <fc-layoutcol fcSpans="8,1" fccontent>
                            <fc-text [fcLabel]="'附件'" name="textname" fccontent1 class="attachment"></fc-text>  
                            <div class="sys-choose-icon-upload" fccontent2>
                                <fc-upload fcListType="icon" fcShowLabel="N" fccontent class="upload-content attachment-btn" (fcEvent)="event('fileEvent',$event)"
                                    [fcOption]="fcUploadOption">
                                </fc-upload>
                            </div>                          
                        </fc-layoutcol>
                    </fc-layoutpanel>
                </form>
            </fc-layoutpanel>
    </fc-layoutrow>
</fc-layoutpanel>
    `,
    styles: [`
    
  `]
})
export class SyscompanycanceldialogComponent extends ParentEditComponent {
    @Input()
    comp_id: string;
    mainObj: any = {};
    RevokeObj: any = { REVOKE_FILE_NO: "1233" };
    //工具栏配置
    tlbconfig: any[] = [{
        'BTNTYPE': 'default',
        'BTNICON': '',
        'ACTCODE': 'save',
        'BTNNAME': '保存'
    }, {
        'BTNTYPE': 'default',
        'BTNICON': '',
        'ACTCODE': 'back',
        'BTNNAME': '返回列表'
    }];
    //上传文件配置
    fcUploadOption: any = { FILETYPE: 'PIC', SOURCEID: 'dd90c093667947c4a4265e001602b9cd', SOURCEAID: 'SYSAPP', 'SOURCEFIELD': 'APPURL', 'RESTITLE': '' }

    constructor() {
        super('SYSTEM', 'SYSCOMPANY');
    }
    init(): void {
        // var _comp_id = 'b4cf21e55a824134b27212f4248158e5';//todo  不知道如何接收参数
        // SyscompanyBusiness.getDataByAppID_Col_Val("SYSCOMPANY", "ID", _comp_id).subscribe((result) => {
        //     if (result.CODE === '0' && result.DATA.length > 0) {
        //         this.mainObj = result.DATA[0];
        //     }
        // });
        this.RevokeObj.REVOKE_FILE_NO = "asdfadfe";
    }
    ngOnInit() {

    }
    _init() {

    }
    addNew(mainObj: any): boolean {
        return true;
    }
    afterSave() {
        // this.modal.next(this.emitData);
        // this.modal.destroy();
    }
    _emitdataOutside(data: any) {

    }
    selectdata(ev: any, data: any) {

    }
    _cancel() {

    }
    event(eventName: string, param: any): void {

    }
    tlblistEvent(event: FCEVENT) {
        switch (event.eventName) {
            case "save":
                var _comp_id = this.comp_id;
                SyscompanyBusiness.getDataByAppID_Col_Val("SYSCOMPANY", "ID", _comp_id).subscribe((result) => {
                    if (result.CODE === '0' && result.DATA.length > 0) {
                        this.mainObj = result.DATA[0];

                        for (var _element in this.mainObj) {
                            if (this.mainObj[_element] === 'null' || this.mainObj[_element] == null)
                                this.mainObj[_element] = '';
                        }
                        SyscompanyBusiness.cancelCompany(this.mainObj).subscribe((result) => {
                            if (result.CODE === '0') {
                                SyscompanyBusiness.msgService.success("撤销成功！");
                                //TODO 关闭弹出窗
                            }
                        });
                    }
                });
                break;
        }
    }
}
