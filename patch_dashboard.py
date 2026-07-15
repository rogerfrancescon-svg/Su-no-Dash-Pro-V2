import os

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

target = """  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);"""

replacement = """  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    const handleSelectLote = (event: any) => {
      const loteId = event.detail;
      setSelectedIntegradoIds([loteId]);
      localStorage.setItem('DASHBOARD_SELECTED_INTEGRADOS', JSON.stringify([loteId]));
    };
    window.addEventListener('dashboard:select-lote', handleSelectLote);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('dashboard:select-lote', handleSelectLote);
    };
  }, []);"""

if target in content:
    with open('src/components/Dashboard.tsx', 'w') as f:
        f.write(content.replace(target, replacement))
    print("Patched Dashboard")
else:
    print("Target not found in Dashboard")
