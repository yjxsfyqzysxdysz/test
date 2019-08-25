ALTER proc  [sp_DistributionTimelinessOneHour]  (@date datetime  = null)  
as       
begin  

--declare @date datetime  
set @date = isnull(@date,GETDATE())  
 
declare @ImportDate datetime 
set @ImportDate=convert(date,
case datename(dw,@date) 
       when 'Monday' then @date-5
       when 'Sunday' then @date-4
       when 'Tuesday' then  @date-5
	   when  'Wednesday'  then  @date-5
else @date-3 end
,112
)
declare @l_timeoffset int
set @l_timeoffset =0
if right(SYSDATETIMEOFFSET(),6)='-05:00'
set @l_timeoffset = 0
if right(SYSDATETIMEOFFSET(),6)='-06:00'
set @l_timeoffset = 1

 
--insert rawdata
;with summaryImportDate as (   

select * from (
select top 1 with ties aaa.InvestmentId, aaa.DataUnit,pf.FileId, aaa.EffectiveDate, pf.ImportDate, aaa.ActionTime,aaa.ActionType, a.CountryId,a.Universe from LogData_GPMainDB.dbo.PerformanceTimeSeriesDataSourceTracking as aaa with (nolock)
join SupportData_DMWkspaceDB.dbo.ProviderRawFile as bbb with (nolock) on aaa.FileId = bbb.FileId
join StatusData_DMWkspaceDB.dbo.PerformanceFileStatus as pf with (nolock) on bbb.FileId= pf.FileId
left join LogData_DMWkspaceDB.[dbo].[DataReadyDateLog]  as f with(nolock) on aaa.InvestmentId =f.InvestmentId
join SecurityData.dbo.InvestmentPerformanceId  as b with (nolock)  on aaa.InvestmentId=b.PerformanceId10Char
join SecurityData.dbo.SecuritySearch as a with(nolock)  on a.SecId=b.InvestmentId 
join SupportData_DMWkspaceDB.dbo.InvestmentDataReadiness  as c with (nolock)  on b.PerformanceId10Char = c.InvestmentId
join SupportData_DMWkspaceDB.dbo.ProviderDelivery as ddd with (nolock)on ddd.ProviderDeliveryId = pf.ProviderDeliveryId 
where pf.ImportDate > @ImportDate
and pf.ImportDate <= @date
and datepart(weekday,pf.ImportDate) between 2 and 6
and DATEDIFF(MONTH,aaa.EffectiveDate,pf.ImportDate) <=2
and aaa.DataUnit in (201,202)
and aaa.CurrentValue != 'Null'
and a.Status=1 and c.DataReadiness=9
and a.Universe != '/CEIC/'
and a.Universe not like '%SA%' and a.Universe not like '%CF%'
and aaa.EffectiveDate> isnull(f.DataReadyDate,'1900-1-1') 
and ddd.DeliveryName not like '%EXFTS%'
and a.CountryId != 'CHN'
order by row_number() over (partition by aaa.InvestmentId ,aaa.FileId order by aaa.ActionTime)
) x

union all

select * from (
select top 1 with ties aaa.InvestmentId,aaa.DataUnit,pf.FileId, aaa.EffectiveDate, pf.ImportDate, aaa.ActionTime,aaa.ActionType, a.CountryId,'VA' Universe
from LogData_GPMainDB.dbo.PerformanceTimeSeriesDataSourceTracking as aaa with (nolock)
join SupportData_DMWkspaceDB.dbo.ProviderRawFile as bbb with (nolock) on aaa.FileId = bbb.FileId
join StatusData_DMWkspaceDB.dbo.PerformanceFileStatus as pf with (nolock) on bbb.FileId= pf.FileId
left join LogData_DMWkspaceDB.[dbo].[DataReadyDateLog]  as f with(nolock) on aaa.InvestmentId =f.InvestmentId
join SecurityData.dbo.InvestmentPerformanceId  as b with (nolock)  on aaa.InvestmentId=b.PerformanceId10Char
join [SecurityData].[dbo].[SubaccountSearch] as a with(nolock) on a.[SubaccountId]=b.InvestmentId 
join SupportData_DMWkspaceDB.dbo.InvestmentDataReadiness  as c with (nolock)  on b.PerformanceId10Char = c.InvestmentId 
join SupportData_DMWkspaceDB.dbo.ProviderDelivery as ddd with (nolock)on ddd.ProviderDeliveryId = pf.ProviderDeliveryId 
where pf.ImportDate > @ImportDate
and pf.ImportDate <= @date
and datepart(weekday,pf.ImportDate) between 2 and 6 
and DATEDIFF(MONTH,aaa.EffectiveDate,pf.ImportDate) <=2
and aaa.DataUnit in (201,202)
and aaa.CurrentValue != 'Null'
and a.Status=1 and c.DataReadiness=9
and aaa.EffectiveDate> isnull(f.DataReadyDate,'1900-1-1') 
and ddd.DeliveryName not like '%EXFTS%'
and a.CountryId != 'CHN'
order by row_number() over (partition by aaa.InvestmentId ,aaa.FileId order by aaa.ActionTime)
) as y

),summaryFile as (
 
--insert rawdata 

select * from (
select top 1 with ties aaa.InvestmentId, aaa.DataUnit,pf.FileId, aaa.EffectiveDate, bbb.RawFileDate, aaa.ActionTime,aaa.ActionType, a.CountryId,a.Universe from LogData_GPMainDB.dbo.PerformanceTimeSeriesDataSourceTracking as aaa with (nolock)
join SupportData_DMWkspaceDB.dbo.ProviderRawFile as bbb with (nolock) on aaa.FileId = bbb.FileId
join StatusData_DMWkspaceDB.dbo.PerformanceFileStatus as pf with (nolock) on bbb.FileId= pf.FileId
left join LogData_DMWkspaceDB.[dbo].[DataReadyDateLog]  as f with(nolock) on aaa.InvestmentId =f.InvestmentId
join SecurityData.dbo.InvestmentPerformanceId  as b with (nolock)  on aaa.InvestmentId=b.PerformanceId10Char
join SecurityData.dbo.SecuritySearch as a with(nolock)  on a.SecId=b.InvestmentId 
join SupportData_DMWkspaceDB.dbo.InvestmentDataReadiness  as c with (nolock)  on b.PerformanceId10Char = c.InvestmentId
join SupportData_DMWkspaceDB.dbo.ProviderDelivery as ddd with (nolock)on ddd.ProviderDeliveryId = pf.ProviderDeliveryId 
where bbb.RawFileDate > @ImportDate
and bbb.RawFileDate <= @date
and datepart(weekday,bbb.RawFileDate) between 2 and 6
and DATEDIFF(MONTH,aaa.EffectiveDate, bbb.RawFileDate) <=2
and aaa.DataUnit in (201,202)
and a.Status=1 and c.DataReadiness=9
and a.Universe != '/CEIC/' and a.Universe != '/SA/'
and a.Universe not like '%CF%' and a.Universe not like '%HF%'
and aaa.EffectiveDate> isnull(f.DataReadyDate,'1900-1-1') 
and ddd.DeliveryName not like '%EXFTS%'
and a.CountryId != 'CHN'
order by row_number() over (partition by aaa.InvestmentId,aaa.DataUnit, aaa.EffectiveDate order by aaa.ActionTime)
) xx

union all

select * from (
select top 1 with ties 
aaa.InvestmentId,aaa.DataUnit,pf.FileId, aaa.EffectiveDate, bbb.RawFileDate, aaa.ActionTime,aaa.ActionType, a.CountryId,'VA' Universe
 from LogData_GPMainDB.dbo.PerformanceTimeSeriesDataSourceTracking as aaa with (nolock)
join SupportData_DMWkspaceDB.dbo.ProviderRawFile as bbb with (nolock) on aaa.FileId = bbb.FileId
join StatusData_DMWkspaceDB.dbo.PerformanceFileStatus as pf with (nolock) on bbb.FileId= pf.FileId
left join LogData_DMWkspaceDB.[dbo].[DataReadyDateLog]  as f with(nolock) on aaa.InvestmentId =f.InvestmentId
join SecurityData.dbo.InvestmentPerformanceId  as b with (nolock)  on aaa.InvestmentId=b.PerformanceId10Char
join [SecurityData].[dbo].[SubaccountSearch] as a with(nolock) on a.[SubaccountId]=b.InvestmentId 
join SupportData_DMWkspaceDB.dbo.InvestmentDataReadiness  as c with (nolock)  on b.PerformanceId10Char = c.InvestmentId 
join SupportData_DMWkspaceDB.dbo.ProviderDelivery as ddd with (nolock)on ddd.ProviderDeliveryId = pf.ProviderDeliveryId 
where bbb.RawFileDate >= @ImportDate  
and bbb.RawFileDate < @date
and datepart(weekday,bbb.RawFileDate) between 2 and 6
and DATEDIFF(MONTH,aaa.EffectiveDate, bbb.RawFileDate) <=2
and aaa.DataUnit in (201,202)
and a.Status=1 and c.DataReadiness=9
and aaa.EffectiveDate> isnull(f.DataReadyDate,'1900-1-1') 
and ddd.DeliveryName not like '%EXFTS%'
and a.CountryId != 'CHN'
order by row_number() over (partition by aaa.InvestmentId ,aaa.DataUnit, aaa.EffectiveDate order by aaa.ActionTime)
) as yy

)


--get ratio
select ISNULL(a.[DATE], b.[DATE]) as [DATE], a.[RawFileDate T+1h], 
Case when sz=0 then 0 else [RawFileDate T+1h(sz)]*1.0/sz end as [RawFileDate T+1h Ratio(sz)],
Case when Madrid =0 then 0 else [RawFileDate T+1h(Madrid)]*1.0/ Madrid end as [RawFileDate T+1h Ratio(Madrid)],
Case when India =0 then 0 else [RawFileDate T+1h(India)]*1.0/ India end as [RawFileDate T+1h Ratio(India)],
a.[RawFileDate T+1h ratio], a.TOTAL as RawFileDateTOTAL, 
 b.[ImportDate T+1h],
Case when szI=0 then 0 else [ImportDate T+1h(sz)]*1.0/szI end as [ImportDate T+1h Ratio(sz)],
Case when MadridI =0 then 0 else [ImportDate T+1h(Madrid)]*1.0/ MadridI end as [ImportDate T+1h Ratio(Madrid)],
Case when IndiaI =0 then 0 else [ImportDate T+1h(India)]*1.0/ IndiaI end as [ImportDate T+1h Ratio(India)],
 b.[ImportDate T+1h ratio], b.TOTAL as ImportDateTOTAL
 
 from (
	select convert(varchar(10), RawFileDate,20) [DATE],
	SUM(IIF(ActionTime<=DATEADD(HOUR,1, RawFileDate),1,0)) as [RawFileDate T+1h],
	SUM(IIF(ActionTime<=DATEADD(HOUR,1, RawFileDate),1,0))*1.0/count(1) as [RawFileDate T+1h ratio],
	SUM(case when PeriodType =1 then IIF(ActionTime<=DATEADD(HOUR,1, RawFileDate),1,0) else 0 end) as [RawFileDate T+1h(sz)],
	SUM(case when PeriodType =2 then IIF(ActionTime<=DATEADD(HOUR,1, RawFileDate),1,0) else 0 end) as [RawFileDate T+1h(Madrid)],
	SUM(case when PeriodType =3 then IIF(ActionTime<=DATEADD(HOUR,1, RawFileDate),1,0) else 0 end) as [RawFileDate T+1h(India)],
	Sum(case when PeriodType =1 then 1 else 0 end) as sz,
	Sum(case when PeriodType =2 then 1 else 0 end) as Madrid,
	Sum(case when PeriodType =3 then 1 else 0 end) as India,
	count(1) TOTAL
	from ( 
      
      SELECT  *,
        CASE 
          WHEN DATEPART(hour,RawFileDate) < 4 - @l_timeoffset OR DATEPART(hour, RawFileDate) >= 20 - @l_timeoffset THEN 1
          WHEN DATEPART(hour ,RawFileDate) >= 4 - @l_timeoffset AND DATEPART(hour ,RawFileDate) < 12 - @l_timeoffset then 2
          WHEN DATEPART(hour, RawFileDate) >= 12 - @l_timeoffset AND DATEPART(hour ,RawFileDate) < 20 - @l_timeoffset THEN 3
          ELSE 0
        END
      PeriodType FROM summaryFile


      -- WHEN
      --   ((DATEPART(hour, RawFileDate) = 3 - @l_timeoffset AND DATEPART(minute, RawFileDate) < 30) OR DATEPART(hour, RawFileDate) < 3 - @l_timeoffset)
      --   OR
      --   ((DATEPART(hour, RawFileDate) = 19 - @l_timeoffset AND DATEPART(minute, RawFileDate) >= 30) OR DATEPART(hour, RawFileDate) > 20 - @l_timeoffset)
      -- THEN 1


    )summaryFile
	group by convert(varchar(10), RawFileDate,20)
	) a
full outer join (

	select convert(varchar(10), ImportDate,20) [DATE],
	SUM(IIF(ActionTime<=DATEADD(HOUR,1, ImportDate),1,0)) as [ImportDate T+1h],
	SUM(IIF(ActionTime<=DATEADD(HOUR,1, ImportDate),1,0))*1.0/count(1) as [ImportDate T+1h ratio],
	SUM(case when PeriodType =1 then IIF(ActionTime<=DATEADD(HOUR,1, ImportDate),1,0) else 0 end) as [ImportDate T+1h(sz)],
	SUM(case when PeriodType =2 then IIF(ActionTime<=DATEADD(HOUR,1, ImportDate),1,0) else 0 end) as [ImportDate T+1h(Madrid)],
	SUM(case when PeriodType =3 then IIF(ActionTime<=DATEADD(HOUR,1, ImportDate),1,0) else 0 end) as [ImportDate T+1h(India)],
	Sum(case when PeriodType =1 then 1 else 0 end) as szI,
	Sum(case when PeriodType =2 then 1 else 0 end) as MadridI,
	Sum(case when PeriodType =3 then 1 else 0 end) as IndiaI,
	count(1) TOTAL
	from ( 
      
       select  *, case when DATEPART(hour,ImportDate)<4-@l_timeoffset OR DATEPART(hour, ImportDate)>=20-@l_timeoffset THEN 1
                         WHEN DATEPART(hour ,ImportDate) >= 4-@l_timeoffset and DATEPART(hour ,ImportDate)<12-@l_timeoffset then 2
                         WHEN DATEPART(hour, ImportDate) >= 12-@l_timeoffset and DATEPART(hour ,ImportDate) < 20-@l_timeoffset THEN 3
       ELSE 0 END PeriodType 
            from summaryImportDate

    )summaryImportDate
	group by convert(varchar(10), ImportDate,20)
	) b on a.[DATE] = b.[DATE]

order by 1

end