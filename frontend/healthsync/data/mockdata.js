import { addDays, format, setHours, setMinutes } from 'date-fns';

const generateTimeSlots = (date) => {
  const slots = [];
  for (let hour = 9; hour < 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const startTime = setMinutes(setHours(date, hour), minute);
      const endTime = setMinutes(setHours(date, hour), minute + 30);
      slots.push({
        id: `${format(startTime, 'HH:mm')}-${format(endTime, 'HH:mm')}`,
        startTime: format(startTime, 'HH:mm'),
        endTime: format(endTime, 'HH:mm'),
        isBooked: Math.random() > 0.7
      });
    }
  }
  return slots;
};

export const doctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: 12,
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    availableSlots: generateTimeSlots(new Date())
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Dermatologist',
    experience: 8,
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    availableSlots: generateTimeSlots(addDays(new Date(), 1))
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    specialization: 'Pediatrician',
    experience: 15,
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300',
    availableSlots: generateTimeSlots(addDays(new Date(), 2))
  }
];

export const specializations = [
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Neurologist',
  'Orthopedist'
];