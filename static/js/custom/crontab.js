/*********************************
 * Author: HuangYao
 * Content: 定义crontab管理界面的动作
 *********************************/

$(document).ready(function () {
    // $('#deleteCron').tooltip('删除');

    $('#addCrontabButton').click(function () {
        let minion_id = $("#minion_select").val();
        let cmd = $("#cmd").val().trim();
        let frequency = $("#frequency").val().trim();
        if (!minion_id || !cmd || !frequency){
            alert("请填写必填内容");
            return false;
        }

        if (minion_id.length === 0 || cmd.length === 0 || frequency.length === 0) {
            alert("请填写必填内容");
            return false;
        }
        let res = cronValidate(frequency);
        if (!res){
            return false;
        }

        let url = "/asset/cronList/add/";
        let data = {
            'minion_id': minion_id,
            'cmd': cmd,
            'frequency': frequency,
        };
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            traditional: true,
            beforeSend: function () {
                // 禁用按钮防止重复提交
                $("#addCrontabButton").attr({disabled: "disabled"});
                $("#page_loading").show();
            },
            success: function (result) {
                if (result.code === 0) {
                    window.location.reload();
                }
                else {
                    alert(result.msg);
                    $("#addCrontabButton").removeAttr("disabled");
                }
                $("#page_loading").hide();
            },
            error: function () {
                alert('失败');
                $("#addCrontabButton").removeAttr("disabled");
                $("#page_loading").hide();
            }
        });
    });

    $('#deleteCrontabButton').click(function () {
        let del_cron_id = $("#deleteCrontabButton").val();
        let url = "/asset/cronList/del/";
        let data = {
            'del_cron_id': del_cron_id,
        };
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            traditional: true,
            beforeSend: function () {
                // 禁用按钮防止重复提交
                $("#deleteCrontabButton").attr({disabled: "disabled"});
            },
            success: function (result) {
                $("#deleteCrontabButton").val('');
                if (result.code === 0) {
                    window.location.reload();
                }
                else {
                    alert(result.msg);
                    $("#deleteCrontabButton").removeAttr("disabled");
                }
            },
            error: function () {
                alert('失败');
                $("#deleteCrontabButton").removeAttr("disabled");
            }
        });
    });

    $('#modifyCrontabButton').click(function () {
        let minion_id = $("#minion_modify").val();
        let old_minion_id = $("#minion_old").val();
        let crontab_id = $("#crontab_modify").val();
        if (minion_id.length === 0) {
            alert("请选择部署机器");
            return false;
        }
        if (old_minion_id === minion_id){
            alert("未作修改");
            return false;
        }

        let url = "/asset/cronList/modify/";
        let data = {
            'minion_id': minion_id,
            'crontab_id': crontab_id,
        };
        $.ajax({
            url: url,
            type: "POST",
            data: data,
            contentType: 'application/x-www-form-urlencoded',
            traditional: true,
            beforeSend: function () {
                // 禁用按钮防止重复提交
                $("#modifyCrontabButton").attr({disabled: "disabled"});
            },
            success: function (result) {
                if (result.code === 0) {
                    window.location.reload();
                }
                else {
                    alert(result.msg);
                    $("#modifyCrontabButton").removeAttr("disabled");
                }
            },
            error: function () {
                alert('失败');
                $("#modifyCrontabButton").removeAttr("disabled");
            }
        });
    });
});

function SendValue(crontab_id, minion_id){
    $("#minion_old").val(minion_id);
    $("#crontab_modify").val(crontab_id);
    $("#minion_modify").val(minion_id);
}

function SendDeleteValue(crontab_id) {
    $("#deleteCrontabButton").val(crontab_id);
}

function startCrontab(crontab_id) {
    let url = '/asset/cronList/start/';
    let data = {
        'crontab_id': crontab_id,
    };
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        traditional: true,
        success: function (result) {
            if (result.code === 0) {
                window.location.reload();
            }
            else {
                alert(result.msg);
            }
        },
        error: function () {
            alert('失败');
        }
    });
}

function pauseCrontab(crontab_id) {
    let url = '/asset/cronList/pause/';
    let data = {
        'crontab_id': crontab_id,
    };
    $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: 'application/x-www-form-urlencoded',
        traditional: true,
        success: function (result) {
            if (result.code === 0) {
                window.location.reload();
            }
            else {
                alert(result.msg);
            }
        },
        error: function () {
            alert('失败');
        }
    });
}