import { useState, useEffect } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, isPast, startOfDay } from "date-fns"

// Add custom scrollbar styles
const scrollbarStyles = `
  .calendar-events-list::-webkit-scrollbar {
    width: 4px;
  }
  
  .calendar-events-list::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .calendar-events-list::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  
  .calendar-events-list::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`

const Calendar = ({ events, onDateSelect, holidays = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const firstDay = startOfMonth(currentMonth)
  const lastDay = endOfMonth(currentMonth)

  // Inject scrollbar styles
  useEffect(() => {
    const styleTag = document.createElement('style')
    styleTag.innerHTML = scrollbarStyles
    document.head.appendChild(styleTag)
    return () => {
      document.head.removeChild(styleTag)
    }
  }, [])

  const getEventsForDate = (date) => {
    return events.filter((event) => isSameDay(new Date(event.startTime), date))
  }

  const getHolidaysForDate = (date) => {
    return holidays.filter((holiday) => isSameDay(new Date(holiday.date), date))
  }

  const isPastDay = (date) => {
    return isPast(startOfDay(date)) && !isToday(date)
  }

  const getDaysInWeek = () => {
    const days = []
    const day = new Date(firstDay)
    day.setDate(day.getDate() - day.getDay())

    while (day <= lastDay || day.getDay() !== 0) {
      days.push(new Date(day))
      day.setDate(day.getDate() + 1)
    }
    return days
  }

  const weeks = []
  let week = []
  getDaysInWeek().forEach((day) => {
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
    week.push(day)
  })
  if (week.length > 0) weeks.push(week)

  const formatEventTime = (startTime, endTime) => {
    const start = new Date(startTime)
    const end = new Date(endTime)
    return `${format(start, "h:mm a")} - ${format(end, "h:mm a")}`
  }

  return (
    <div style={styles.container}>
      <div style={styles.monthHeader}>
        <button
          style={styles.navButton}
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
        >
           Prev
        </button>
        <h3 style={styles.monthTitle}>{format(currentMonth, "MMMM yyyy")}</h3>
        <button
          style={styles.navButton}
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
        >
          Next 
        </button>
      </div>

      <div style={styles.weekDays}>
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
          <div key={day} style={styles.weekDay}>
            {day}
          </div>
        ))}
      </div>

      <div style={styles.grid}>
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} style={styles.week}>
            {week.map((day, dayIdx) => {
              const dayEvents = getEventsForDate(day)
              const dayHolidays = getHolidaysForDate(day)
              const isCurrentMonth = isSameMonth(day, currentMonth)
              const isDayToday = isToday(day)
              const isPastDate = isPastDay(day)
              return (
                <div
                  key={dayIdx}
                  style={{
                    ...styles.dayCell,
                    ...(isCurrentMonth ? {} : styles.otherMonth),
                    ...(isDayToday ? styles.today : {}),
                    ...(isPastDate ? styles.pastDay : {}),
                  }}
                  onClick={() => !isPastDate && onDateSelect && onDateSelect(day)}
                >
                  {/* Event count badge */}
                  {dayEvents.length > 0 && (
                    <div style={styles.eventBadge}>
                      {dayEvents.length}
                    </div>
                  )}
                  
                  <div style={{ ...styles.dayNumber, ...(isDayToday ? styles.todayNumber : {}) }}>
                    {format(day, "d")}
                  </div>
                  
                  {/* Scrollable events list */}
                  <div className="calendar-events-list" style={styles.eventsList}>
                    {dayEvents.map((event) => (
                      <div
                        key={event._id}
                        style={{
                          ...styles.eventItem,
                          backgroundColor: event.status === "SWAPPABLE" ? "var(--primary)" : event.status === "SWAP_PENDING" ? "#ff9800" : "#3b82f6",
                        }}
                        title={`${event.title}\n${formatEventTime(event.startTime, event.endTime)}\nStatus: ${event.status}`}
                      >
                        <div style={styles.eventContent}>
                          <span style={styles.eventTitle}>{event.title}</span>
                          <span style={styles.eventTime}>
                            {format(new Date(event.startTime), "h:mm a")} - {format(new Date(event.endTime), "h:mm a")}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Holidays display */}
                    {dayHolidays.map((holiday, idx) => (
                      <div key={`holiday-${idx}`} style={styles.holidayItem}>
                        🎉 {holiday.name}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: "var(--bg-secondary)",
    border: "1px solid var(--border-color)",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 1px 3px var(--shadow)",
  },
  monthHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  navButton: {
    padding: "8px 16px",
    backgroundColor: "var(--bg-tertiary)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-color)",
    cursor: "pointer",
    fontWeight: "600",
    borderRadius: "6px",
    fontSize: "14px",
  },
  monthTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "var(--text-primary)",
  },
  weekDays: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
    marginBottom: "8px",
    borderBottom: "2px solid var(--border-color)",
    paddingBottom: "8px",
  },
  weekDay: {
    textAlign: "center",
    fontWeight: "600",
    color: "var(--text-secondary)",
    fontSize: "12px",
    padding: "8px",
    textTransform: "uppercase",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  week: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
  },
  dayCell: {
    backgroundColor: "var(--bg-primary)",
    border: "1px solid var(--border-color)",
    padding: "8px 6px",
    minHeight: "120px",
    maxHeight: "140px",
    cursor: "pointer",
    transition: "all 0.2s",
    borderRadius: "4px",
    position: "relative",
    overflow: "visible",
    display: "flex",
    flexDirection: "column",
  },
  otherMonth: {
    opacity: 0.4,
    backgroundColor: "var(--bg-secondary)",
  },
  pastDay: {
    backgroundColor: "#f5f5f5",
    opacity: 0.6,
    cursor: "not-allowed",
  },
  today: {
    backgroundColor: "#e3f2fd",
    border: "2px solid #2196f3",
  },
  eventBadge: {
    position: "absolute",
    top: "4px",
    left: "4px",
    backgroundColor: "#f44336",
    color: "white",
    borderRadius: "4px",
    padding: "2px 6px",
    fontSize: "10px",
    fontWeight: "700",
    zIndex: 10,
    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
  },
  dayNumber: {
    fontWeight: "600",
    color: "var(--text-primary)",
    fontSize: "13px",
    marginBottom: "6px",
    textAlign: "right",
  },
  todayNumber: {
    backgroundColor: "#2196f3",
    color: "white",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
  },
  eventsList: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    flex: 1,
    overflowY: "scroll",
    overflowX: "hidden",
    paddingRight: "4px",
    marginTop: "4px",
  },
  eventItem: {
    padding: "4px 6px",
    borderRadius: "3px",
    fontSize: "11px",
    color: "white",
    // overflow: "hidden",
    cursor: "pointer",
    transition: "opacity 0.2s",
    marginBottom: "2px",
  },
  eventContent: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  eventTitle: {
    fontWeight: "600",
    fontSize: "11px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  eventTime: {
    fontWeight: "400",
    fontSize: "9px",
    opacity: 0.9,
  },
  holidayItem: {
    padding: "4px 6px",
    borderRadius: "3px",
    fontSize: "10px",
    color: "#1b5e20",
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    border: "1px solid rgba(76, 175, 80, 0.4)",
    marginTop: "2px",
    fontWeight: "500",
  },
  eventMore: {
    fontSize: "10px",
    color: "var(--text-secondary)",
    padding: "2px 4px",
    fontWeight: "500",
  },
}

export default Calendar
