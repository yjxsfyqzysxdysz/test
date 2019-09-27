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


select a.ProviderDeliveryId, a.DeliveryName, DeliverySetting.value('(/DeliverySetting/Team)[1]','int') as Team, c.Email
	from SupportData_DMWkspaceDB.dbo.ProviderDelivery a with(nolock)
	join SupportData_DMWkspaceDB.dbo.UserIdMapping b with(nolock)
	on a.ProviderDeliveryId = b.Id
	join SupportData_DMWkspaceDB.dbo.UserSearch c with(nolock)
on b.UserId = c.UserId

Select [InvestmentId], [InvestmentType], [PriceType], MAX[EffectiveDate], [Price], [LastUpdate]
	FROM [MasterData_DMPerformDB].[dbo].[InvestmentPrice]
	Where InvestmentId in ('0P00019O4Y')
Group by [InvestmentId], [InvestmentType], [PriceType], [Price], [LastUpdate]

Msg 207, Level 16, State 1, Line 1 Invalid column name 'max'.