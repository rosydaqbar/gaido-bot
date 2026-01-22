feat: Major web interface enhancements and translation improvements

## 🎨 UI/UX Improvements
- **Mobile scrolling fix**: Fixed skills list scrolling on mobile devices with proper CSS flexbox and overflow handling
- **Clean list styling**: Replaced card-based materials and guide lists with clean divider-separated lists
- **Shadcn-style switch**: Replaced checklist button with modern toggle switch component
- **Version footer**: Added v0.14.3 and development status badges at sidebar bottom
- **Removed skill badges**: Cleaned up UI by removing "gathering" and "crafting" type labels

## ✅ Checklist Functionality
- **Interactive checklists**: Added "Aktifkan Checklist" toggle for each life skill
- **Progress tracking**: Dynamic status badges showing "On Progress" or "Selesai" 
- **Cookie persistence**: All checklist states saved in browser cookies (30-day expiration)
- **Real-time updates**: Status automatically updates when all materials are checked

## ⏰ Countdown Timer
- **Weekly reset timer**: Added live countdown to Monday 05:00 AM GMT+7
- **Pulsating animation**: Colon in "Waktu Reset:" pulses every second
- **Precise timing**: Shows days, hours, minutes, and seconds with real-time updates
- **Timezone handling**: Proper GMT+7 conversion from user's local timezone

## 🌐 Translation Fixes
- **Game term preservation**: Kept all New World game-specific terms in English
- **Natural Indonesian**: Improved Indonesian text to sound more natural for gamers
- **Fixed cringe translations**: Replaced overly formal Indonesian with gaming-appropriate language
- **Consistent terminology**: Mixed Indonesian and English naturally like Indonesian gamers speak

## 🎯 Content Updates
- **Improved guides**: Enhanced "Langkah-langkah Proses" and "Cara Lain" sections
- **Better instructions**: More accurate and helpful step-by-step guides
- **Location accuracy**: Corrected all New World location names and game systems

## 🔧 Technical Improvements
- **Mobile responsiveness**: Enhanced mobile layout with proper scrolling and spacing
- **Performance optimization**: Efficient countdown updates and state management
- **Clean code structure**: Better organized CSS and React component structure
- **Accessibility**: Proper focus states and keyboard navigation for switch component

## 📱 Mobile Enhancements
- **Fixed scrolling**: Skills list now properly scrolls on mobile devices
- **Responsive design**: All new features work seamlessly on mobile
- **Touch optimization**: Smooth scrolling with -webkit-overflow-scrolling: touch
- **Compact layout**: Optimized spacing and sizing for small screens

Files modified:
- src/templates/weekly-page.js (major UI overhaul)
- src/data/skills-data.js (translation improvements)
- worker.js (manual scheduled message trigger)