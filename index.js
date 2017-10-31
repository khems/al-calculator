function openTab (event, activeTabId) {
  let tabcontent = document.getElementsByClassName('tabcontent')
  let tablinks = document.getElementsByClassName('tablinks')

  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none'
  }

  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '')
  }

  document.getElementById(activeTabId).style.display = 'block'
  event.currentTarget.className += ' active'
}

function calculatePartTime () {
  let hours = document.getElementById('hours').value
  let dailyHours = document.getElementById('dailyHours').value

  let leaveEntitlement = hours /
    37.5 *
    7.5 *
    document.getElementById('fteLeave').value

  let leaveHours = Math.round((leaveEntitlement + 0.00001) * 100) / 100
  let bankHolidayHours = Math.round((hours / 37.5 * 8 * 7.5 + 0.00001) * 100) / 100

  document.getElementById('leave').value = leaveHours
  document.getElementById('daysLeave').value = Math.round((leaveHours / dailyHours + 0.00001) * 100) / 100
  document.getElementById('bankHoliday').value = bankHolidayHours
  document.getElementById('daysBankHoliday').value = Math.round((bankHolidayHours / dailyHours + 0.00001) * 100) / 100
}

function calculateMidYear () {
  let today = new Date()
  let currentAnnualLeaveEnd = today.getMonth() < 9
    ? today.getFullYear() + '-10-01'
    : (today.getFullYear() + 1) + '-10-01'

  let millisecondsWorked = new Date(currentAnnualLeaveEnd).getTime() -
    new Date(document.getElementById('midDateStarted').value).getTime()

  let yearProportion = (millisecondsWorked / (1000 * 60 * 60 * 24)) / 365

  let hours = document.getElementById('midHours').value
  let dailyHours = document.getElementById('midDailyHours').value

  let leaveEntitlement = hours /
    37.5 *
    7.5 *
    document.getElementById('midFteLeave').value *
    yearProportion

  let leaveHours = Math.round((leaveEntitlement + 0.00001) * 100) / 100
  let bankHolidayHours = Math.round((hours / 37.5 * 8 * 7.5 + 0.00001) * 100) / 100

  document.getElementById('midLeave').value = leaveHours
  document.getElementById('midDaysLeave').value = Math.round((leaveHours / dailyHours + 0.00001) * 100) / 100
  document.getElementById('midBH').value = bankHolidayHours
  document.getElementById('midDaysBH').value = Math.round((bankHolidayHours / dailyHours + 0.00001) * 100) / 100
}

function calculateLeaver () {
  let today = new Date()
  let currentAnnualLeaveStart = today.getMonth() < 9
    ? (today.getFullYear() - 1) + '-10-01'
    : today.getFullYear() + '-10-01'

  let millisecondsWorked = new Date(document.getElementById('leaverEndDate').value).getTime() -
    new Date(currentAnnualLeaveStart).getTime()

  let yearProportion = (millisecondsWorked / (1000 * 60 * 60 * 24)) / 365

  let hours = document.getElementById('leaverHours').value
  let dailyHours = document.getElementById('leaverDailyHours').value

  let leaveEntitlement = hours /
    37.5 *
    7.5 *
    document.getElementById('leaverFteLeave').value *
    yearProportion

  let leaveHours = Math.round((leaveEntitlement + 0.00001) * 100) / 100
  let bankHolidayHours = Math.round((hours / 37.5 * 8 * 7.5 + 0.00001) * 100) / 100

  document.getElementById('leaverLeave').value = leaveHours
  document.getElementById('leaverDaysLeave').value = Math.round((leaveHours / dailyHours + 0.00001) * 100) / 100
  document.getElementById('leaverBH').value = bankHolidayHours
  document.getElementById('leaverDaysBH').value = Math.round((bankHolidayHours / dailyHours + 0.00001) * 100) / 100
}

function calculateMidChangeYear () {
  let today = new Date()

  let currentAnnualLeaveEnd = today.getMonth() < 9
    ? today.getFullYear() + '-10-01'
    : (today.getFullYear() + 1) + '-10-01'

  let currentAnnualLeaveStart = today.getMonth() >= 9
    ? today.getFullYear() + '-10-01'
    : (today.getFullYear() - 1) + '-10-01'

  let dateOfChange = document.getElementById('midChangeDateStarted').value

  let millisecondsWorkedFirstTimePeriod = new Date(dateOfChange).getTime() -
    new Date(currentAnnualLeaveStart).getTime()

  let millisecondsWorkedSecondTimePeriod = new Date(currentAnnualLeaveEnd).getTime() -
    new Date(dateOfChange).getTime()

  let firstYearProportion = (millisecondsWorkedFirstTimePeriod / (1000 * 60 * 60 * 24)) / 365
  let secondYearProportion = (millisecondsWorkedSecondTimePeriod / (1000 * 60 * 60 * 24)) / 365

  let oldHours = document.getElementById('midChangeOldHours').value
  let newHours = document.getElementById('midChangeNewHours').value

  let leaveEntitlement = (
    oldHours /
    37.5 *
    7.5 *
    document.getElementById('midChangeFteLeave').value *
    firstYearProportion
    ) + (
    newHours /
    37.5 *
    7.5 *
    document.getElementById('midChangeFteLeave').value *
    secondYearProportion
    )

  let bhEntitlement = (
    oldHours /
    37.5 *
    8 *
    7.5 *
    firstYearProportion
    ) + (
    newHours /
    37.5 *
    8 *
    7.5 *
    secondYearProportion
    )

  document.getElementById('midChangeLeave').value = Math.round((leaveEntitlement + 0.00001) * 100) / 100
  document.getElementById('midChangeBH').value = Math.round((bhEntitlement + 0.00001) * 100) / 100
}

// -add on days equivalent (using input hours in day)
// make it work as an electron app
