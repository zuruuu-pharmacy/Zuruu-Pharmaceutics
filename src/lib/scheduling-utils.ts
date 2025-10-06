// Scheduling and demo booking utilities

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  timezone: string;
}

export interface DemoBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  meetingLink?: string;
}

export interface ScheduleConfig {
  timezone: string;
  workingHours: {
    start: string;
    end: string;
  };
  workingDays: number[]; // 0 = Sunday, 1 = Monday, etc.
  slotDuration: number; // in minutes
  advanceBookingDays: number;
}

// Default schedule configuration
export const defaultScheduleConfig: ScheduleConfig = {
  timezone: 'UTC',
  workingHours: {
    start: '09:00',
    end: '17:00'
  },
  workingDays: [1, 2, 3, 4, 5], // Monday to Friday
  slotDuration: 30,
  advanceBookingDays: 14
};

// Generate available time slots
export function generateTimeSlots(config: ScheduleConfig = defaultScheduleConfig): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  for (let i = 1; i <= config.advanceBookingDays; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    // Skip weekends if not working days
    if (!config.workingDays.includes(date.getDay())) {
      continue;
    }
    
    const startTime = new Date(date);
    const [startHour, startMinute] = config.workingHours.start.split(':').map(Number);
    startTime.setHours(startHour, startMinute, 0, 0);
    
    const endTime = new Date(date);
    const [endHour, endMinute] = config.workingHours.end.split(':').map(Number);
    endTime.setHours(endHour, endMinute, 0, 0);
    
    let currentTime = new Date(startTime);
    
    while (currentTime < endTime) {
      const timeString = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      slots.push({
        id: `${date.toISOString().split('T')[0]}_${timeString}`,
        date: date.toISOString().split('T')[0],
        time: timeString,
        available: Math.random() > 0.3, // 70% availability for demo
        timezone: config.timezone
      });
      
      currentTime.setMinutes(currentTime.getMinutes() + config.slotDuration);
    }
  }
  
  return slots;
}

// Book demo session
export async function bookDemo(bookingData: Omit<DemoBooking, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; bookingId?: string; error?: string }> {
  try {
    // Generate booking ID
    const bookingId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create booking record
    const booking: DemoBooking = {
      id: bookingId,
      ...bookingData,
      status: 'pending',
      createdAt: new Date(),
      meetingLink: `https://meet.zuruu.com/demo/${bookingId}`
    };
    
    // Store booking (in real app, save to database)
    const existingBookings = JSON.parse(localStorage.getItem('demoBookings') || '[]');
    existingBookings.push(booking);
    localStorage.setItem('demoBookings', JSON.stringify(existingBookings));
    
    // Simulate confirmation email
    await sendDemoConfirmationEmail(booking);
    
    return {
      success: true,
      bookingId
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to book demo'
    };
  }
}

// Send demo confirmation email
async function sendDemoConfirmationEmail(booking: DemoBooking): Promise<boolean> {
  try {
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(`Demo confirmation sent to ${booking.email}`);
    console.log(`Booking ID: ${booking.id}`);
    console.log(`Meeting Link: ${booking.meetingLink}`);
    
    return true;
  } catch (error) {
    console.error('Failed to send demo confirmation:', error);
    return false;
  }
}

// Get demo bookings
export function getDemoBookings(): DemoBooking[] {
  try {
    return JSON.parse(localStorage.getItem('demoBookings') || '[]');
  } catch (error) {
    return [];
  }
}

// Cancel demo booking
export function cancelDemoBooking(bookingId: string): boolean {
  try {
    const bookings = getDemoBookings();
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    );
    localStorage.setItem('demoBookings', JSON.stringify(updatedBookings));
    return true;
  } catch (error) {
    return false;
  }
}

// Check availability for specific date/time
export function checkAvailability(date: string, time: string): boolean {
  const bookings = getDemoBookings();
  const conflictingBooking = bookings.find(booking => 
    booking.preferredDate === date && 
    booking.preferredTime === time && 
    booking.status !== 'cancelled'
  );
  
  return !conflictingBooking;
}

