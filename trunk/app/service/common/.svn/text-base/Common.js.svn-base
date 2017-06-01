/**
 * 版权所有(C)，上海海鼎信息工程股份有限公司，1995-2017，所有权利保留。
 * 项目名：hdts
 * 文件名：Common
 * 模块说明：封装一些通用的工具
 * 修改历史：
 * 2017/3/22 - zhuxiaofeng - 创建
 */
Ext.define('hdts.service.common.Common', {
    singleton: true,
    alternateClassName: 'Common',

    //中文提示框
    MsgShow: function (sTitle, sMsg, calback) {
        Ext.Msg.show({
            title: sTitle,
            message: sMsg,
            cls: 'messagebox',
            height: '30%',
            width: '100%',
            icon: Ext.MessageBox.OK,
            buttons: [],
            closable: false,
            maskOnDisable: false,
            fn: function (buttonId) {
                if (calback) {
                    calback();
                }
            }
        });
        /*setTimeout(function () {
         Ext.Msg.hide();
         }, 1000);*/
    },

    MsgContractShow: function (sTitle, prompt, callback) {
        Ext.Msg.show({
            title: sTitle,
            cls: 'contractMsgbox',
            height: '200px',
            width: '100%',
            prompt: prompt,
            buttons: [{text: '取消', itemId: 'cancle', cls: 'contractMsgboxcancle'}, {
                text: '确定',
                itemId: 'yes',
                cls: 'contractMsgboxyes'
            }],
            fn: function (buttonId, arguments) {
                console.dir(arguments);
                if (callback) {
                    if (buttonId == 'yes') {
                        callback.callback(arguments);
                    }
                }
            }
        });
    },

    MsgDeleteShow: function (sTitle, sMsg, calback) {
        Ext.Msg.show({
            title: sTitle,
            message: sMsg,
            cls: 'promptMsgbox',
            height: '30%',
            width: '100%',
            buttons: [{text: '取消', itemId: 'cancle', cls: 'prompttMsgboxcancle'}, {
                text: '确定',
                itemId: 'yes',
                cls: 'prompttMsgboxyes'
            }],
            fn: function (buttonId) {
                if (buttonId == 'cancle') {
                    calback.Cancle();

                }
                else {
                    alert("132")
                }
            }
        });
    },
    MsgConfirm: function (sTitle, prompt, callback) {
        Ext.Msg.show({
            title: sTitle,
            cls: 'confirmmsgbox',
            height: '100px',
            width: '100%',
            message: prompt,
            buttons: [{
                text: '确定',
                itemId: 'yes',
                cls: 'contractMsgboxyes'
            }]
        });
    },
    VersionUpdateConfirm: function (sTitle, sMsg, url) {
        Ext.Msg.show({
            title: "系统提示",
            message: '<div class="divdisplay">'
            + '<div class="confirmtitle" >发现新版本：' + sTitle + '</div>'
            + '<div class="confirmcolor"></div>'
            + '<div class="confirmhtml" >更新内容：</div>'
            + '<div class="confirmhtml confirmmsg" >' + sMsg + '</div>'
            + '</div>',
            cls: 'versionUpdateMsgbox',
            height: '170px',
            width: '100%',
            buttons: [
                {
                    text: '取消',
                    itemId: 'cancle',
                    cls: 'versionUpdateMsgboxcancle'
                },
                {
                    text: '立即更新',
                    itemId: 'yes',
                    cls: 'versionUpdateMsgboxyes'
                }],
            fn: function (buttonId) {
                if (buttonId == 'yes') {
                    window.location.href = url;
                }
            }
        });
    },
    //合同消息框
    MsgPrompt: function (sTitle, sMsg, prompt) {
        Ext.Msg.prompt(
            sTitle,
            sMsg,
            function (buttonId, value) {
                console.log(value);
            },
            null,
            true,
            'test',
            prompt
        );
    },


    //判断输入内容是否超过配置的长度
    isOverMaxLength: function (value, len) {
        if (value.length <= len) {
            return true;
        } else {
            return false;
        }
    },

    //限制两位小数，判断是否可以继续输入小数
    isCanTriDecimal: function (value) {
        var pointIndex = value.indexOf('.');
        if (pointIndex < 0) {
            return true;
        } else {
            var subValue = value.substr(pointIndex + 1, value.length);
            if (subValue.length < 3) {
                return true;
            } else {
                return false;
            }
        }
    },

    //判断金额是否超过配置的长度
    isOverAmtLength: function (value, len) {
        var pointIndex = value.indexOf('.');
        if (parseInt(pointIndex) <= 0) {
            pointIndex = value.length;
        }
        console.log('patindex :' + pointIndex);
        if (pointIndex > len) {
            var subValue = value.substr(0, pointIndex);
            console.log('length:' + subValue.length);
            if (subValue.length > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    //判断是否两位小数
    isTriDecimal: function (value) {
        if (value != null && value != '') {

            //先判断是不是数值类型
            try {
                if (isNaN(value)) {
                    return false;
                }
            }
            catch (e) {
                return false;
            }

            var decimalIndex = value.indexOf('.');
            //没有小数点合法
            if (decimalIndex == '-1') {
                return true;
            } else {
                var decimalPart = value.substring(decimalIndex + 1, value.length);
                //小数小于等于2位合法
                if (decimalPart.length <= 2) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    },

    //utf16to8转码
    utf16to8: function (str) {
        var out, i, len, c;
        out = '';
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    },
    //取数字精度
    roundFun: function (numberRound, roundDigit)   //四舍五入，保留位数为roundDigit
    {
        if (numberRound >= 0) {
            var tempNumber = parseInt((numberRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
            return tempNumber;
        }
        else {
            numberRound1 = -numberRound;
            var tempNumber = parseInt((numberRound1 * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
            return -tempNumber;
        }
    },
    //按条件查找符合条件的条目
    storeFindBy: function (storename, keyname, keyvalue) {
        var index;
        index = Ext.getStore(storename).findBy(function (record) {
            return record.get(keyname) == keyvalue;
        });
        return index;
    },

    //截取字符串
    getSubString: function (str, start, end) {
        if ((str === undefined) || (str === null)) {
            return '';
        }
        else {
            return str.substr(start, end);
        }
    },

    //将数字格式为话金额
    formatMoney: function (s, n) {
        s = s || 0;
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
            r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    },

//  日期转换
    dateConversion: function (store, time) {
        var datey = Ext.Date.format(new Date(), 'y');
        var datem = Ext.Date.format(new Date(), 'm');
        var dated = Ext.Date.format(new Date(), 'd');
        store.load({
            callback: function (records, options, success) {
                var stime;
                for (var i = 0; i < store.getCount(); i++) {  //getCount() 方法 获取 数据集 的长度
                    stime = new Date(store.getAt(i).get('' + time + ''));  //遍历数据集，获取 Time 的数据
                    var syear = Ext.Date.format(stime, 'y');
                    if (syear >= datey) {
                        var smonth = Ext.Date.format(stime, 'm');
                        if (smonth >= datem) {
                            var sdate = Ext.Date.format(stime, 'd');
                            if (sdate == dated) {
                                store.getAt(i).set('' + time + '', ('今天' + Ext.Date.format(stime, 'H:i')).toString());
                                continue;
                            }
                            else if (sdate > dated && (sdate - dated) == 1) {
                                store.getAt(i).set('' + time + '', ('昨天' + Ext.Date.format(stime, 'H:i')).toString());
                                continue;
                            }
                        }
                        //Ext.util.Format.date(stime), 'Y/m/d')
                        store.getAt(i).set('' + time + '', Ext.util.Format.date(stime, 'Y/m/d'));
                    }
                    else {
                        store.getAt(i).set('' + time + '', Ext.util.Format.date(stime, 'Y/m/d'));
                    }
                }
            }
        });
        return store;
    },
    /* /!*根据手机屏幕尺寸 判断消息是否显示展开 收起*!/
     overfullLength: function (name) {
     //是否超行逻辑
     var clientWidth=document.body.clientWidth;
     var len = 0;
     for (var i=0; i<name.length; i++) {
     var c = name.charCodeAt(i);
     //单字节加1
     if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
     len++;
     }
     else {
     len+=2;
     }
     }
     if(len<=200){
     return false;
     }else if(clientWidth<=320&&len>200){
     return true;
     }else if((320<clientWidth<=375)&&(240>=len>200)){
     return false;
     }else if((320<clientWidth<=375)&&(len>240)){
     return true;
     }else if((375<clientWidth<=414)&&(len>260)){
     return true;
     }else if((375<clientWidth<=414)&&(260>=len>240)){
     return false;
     }
     },*/
    /*根据手机屏幕尺寸 判断消息是否显示展开 收起*/
    overLength: function (name, type) {
        //是否超行逻辑
        var clientWidth = document.body.clientWidth;
        var len = 0;
        for (var i = 0; i < name.length; i++) {
            var c = name.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            }
            else {
                len += 2;
            }
        }
        /*iPhone4 iPhone5 屏幕宽度320  iPhone6 屏幕宽度 375 iPhone6 plaus 屏幕宽度414*/
        /*无选择按钮*/
        if (type === 'full') {
            if (len <= 200) {
                return false;
            } else if (clientWidth <= 320 && len > 200) {
                return true;
            } else if ((320 < clientWidth <= 375) && (240 >= len > 200)) {
                return false;
            } else if ((320 < clientWidth <= 375) && (len > 240)) {
                return true;
            } else if ((375 < clientWidth <= 414) && (len > 260)) {
                return true;
            } else if ((375 < clientWidth <= 414) && (260 >= len > 240)) {
                return false;
            }
        } else {/*有选择按钮*/
            if (len <= 180) {
                return false;
            } else if (clientWidth <= 320 && len > 180) {
                return true;
            } else if ((320 < clientWidth <= 375) && (220 >= len > 200)) {
                return false;
            } else if ((320 < clientWidth <= 375) && (len > 220)) {
                return true;
            } else if ((375 < clientWidth <= 414) && (len > 240)) {
                return true;
            } else if ((375 < clientWidth <= 414) && (240 >= len > 220)) {
                return false;
            }
        }
    },
    dateTransposition: function (time) {
        var t = Ext.util.Format.date(time, 'Y/m/d')
        return t;
    },
    dateCompare: function (beginSettle, endSettle) {
        var beginSettley = Ext.Date.format(beginSettle, 'y');
        var beginSettlem = Ext.Date.format(beginSettle, 'm');
        var endSettley = Ext.Date.format(endSettle, 'y');
        var endSettlem = Ext.Date.format(endSettle, 'm');
        if (beginSettley <= endSettley) {
            if (beginSettlem <= endSettlem) {
                return true;
            }
        }
        return false;
    },
    judgmentState: function (state) {
        if (state == 'ineffect' || state.indexOf("未生效") > 0) {
            return 'hd-list-ineffect';
        } else if (state == 'repairing' || state.indexOf("维修中") > 0) {
            return 'hd-list-repairing';
        } else if (state == 'solved' || state.indexOf("已解决") > 0) {
            return 'hd-list-solved';
        } else if (state == 'finished' || state.indexOf("已完成") > 0) {
            return 'hd-list-finished';
        } else if (state == 'aborted' || state.indexOf("已作废") > 0) {
            return 'hd-list-aborted';
        }
    },


    getTaskIconCls: function (billType) {
        if (billType == "maintainBill")
            return "task-maintain-img";
        else if (billType == "salesBill")
            return "task-sales-img";
        else
            return "task-sales-img";

        /*    switch (billType)
         {
         case "maintainBill":
         return "task-maintain-img";
         case "salesBill":
         return "task-sales-img";
         }*/
    },
    toLocaleString: function (total) {
        return parseFloat(total).toLocaleString();
    },
    insertImg: function (me, fileId, name, fileType, size, url) {
        //动态添加图片及图片上方的删除按钮
        if (me.down('#imgsContainer').items.length == 1) {
            me.down('#imgsContainer').insert(0, {
                xtype: 'container',
                itemId: 'containerImg1',
                flex: 'hbox',
                cls: 'hdContainerImage',
                style: "background-image: url(" + url + ")",
                items: [
                    {
                        xtype: 'img',
                        cls: 'hdDeleteImg',
                        itemId: 'deleteimg',
                        src: 'resources/images/delete.png',
                        listeners: {
                            tap: function () {
                                me.down('#imgsContainer').remove(me.down('#containerImg1'));
                                if (me.down('#imgsContainer').items.length == 2) {
                                    me.down('#btnUploadImg').setHidden(false);
                                }

                            }
                        }
                    }
                ]

            });
            //给变量attachment1赋值
            me.attachment1.id = fileId;
            me.attachment1.name = name;
            me.attachment1.fileType = fileType;
            me.attachment1.size = size;

        } else if (me.down('#imgsContainer').items.length == 2) {
            me.down('#imgsContainer').insert(1, {
                xtype: 'container',
                itemId: 'containerImg2',
                flex: 'hbox',
                cls: 'hdContainerImage',
                style: "background-image: url(" + url + ")",
                items: [
                    {
                        xtype: 'img',
                        itemId: 'containerImg2',
                        cls: 'hdDeleteImg',
                        itemId: 'deleteimg',
                        src: 'resources/images/delete.png',
                        listeners: {
                            tap: function () {
                                me.down('#imgsContainer').remove(me.down('#containerImg2'));

                                if (me.down('#imgsContainer').items.length == 2) {
                                    me.down('#btnUploadImg').setHidden(false);
                                }
                            }
                        }
                    }
                ]
            });

            //给变量attachment1赋值
            me.attachment2.id = fileId;
            me.attachment2.name = name;
            me.attachment2.fileType = fileType;
            me.attachment2.size = size;
        }

        if (me.down('#imgsContainer').items.length == 3) {
            me.down('#btnUploadImg').setHidden(true);
        }
    },
});