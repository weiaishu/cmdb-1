# coding:utf8
from crontab import CronTab
import commands
import sys
import croniter
import socket

from project_crontab import models
from asset import models as asset_models

reload(sys)
sys.setdefaultencoding('utf-8')


def syncCronHost2DB():
    """
    将服务器上的crontab同步至DB中
    """
    res = True
    hostname = socket.gethostname()
    try:
        salt_obj = asset_models.minion.objects.get(saltname=hostname)
    except asset_models.minion.DoesNotExist:
        return False
    else:
        my_cron = CronTab(tabfile='/etc/crontab', user=False)
        for job in my_cron[4:]:
            if job.is_enabled():
                print ' '
                print job.command
                print type(job.command)
                try:
                    models.CrontabCmd.objects.get(auto_cmd=job.command)
                except models.CrontabCmd.DoesNotExist:
                    if job.is_valid():
                        is_valid = 1
                    else:
                        is_valid = 2
                    frequency = str(job).split('root')[0].strip()
                    try:
                        svn_obj = models.Svn.objects.get(salt_minion=salt_obj)
                    except models.Svn.DoesNotExist:
                        print 'Svn.DoesNotExist'
                    else:
                        print svn_obj.project_name
                        models.CrontabCmd.objects.create(svn=svn_obj, cmd=job.command, auto_cmd=job.command, frequency=frequency, cmd_status=2, is_valid=is_valid)
                        print 'create ct cmd done'
                else:
                    print 'ct cmd already exist in DB'
        return True
