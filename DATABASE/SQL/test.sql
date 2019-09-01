select a.DeliveryId, a.FileId, a.GeneratedTime, a.OwnerId, a.ReportType, a.ZoneId , max(b.ActionTime), b.FileId, b.ActionType, b.UserId, b.AppName, c.UserId, c.Email
from [StatusData_DMPERFORMDB].[dbo].[DashBoardTask] a
	join [LogData_GPMainDB].[dbo].[FileSourceTracking] b on b.FileId=a.FileId
	join SupportData_DMWkspaceDB.dbo.UserSearch c on b.UserId=c.UserId AND c.UserId=a.OwnerId
where a.ReportType=5
	and a.GeneratedTime>='2019-05-01'
	and a.GeneratedTime<'2019-08-01'
	and b.UserId!=10739
group by a.DeliveryId, a.FileId, a.GeneratedTime, a.OwnerId, a.ReportType, a.ZoneId, b.FileId, b.ActionType, b.UserId, b.AppName, c.UserId, c.Email
order by a.GeneratedTime
