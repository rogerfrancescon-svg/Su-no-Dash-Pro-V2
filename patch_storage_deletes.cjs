const fs = require('fs');
let content = fs.readFileSync('src/lib/storage.ts', 'utf8');

const targetDeleteIntegrado = `        // Always delete by Integrado name as a fallback to catch any orphaned records
        const { error: err2 } = await supabase.from('registros')
          .delete()
          .eq('Integrado', toDelete.name);
        if (err2) throw err2;
      }
    } catch (e: any) {
      throw e;
    }`;

const replaceDeleteIntegrado = `        // Always delete by Integrado name as a fallback to catch any orphaned records
        const { error: err2 } = await supabase.from('registros')
          .delete()
          .eq('Integrado', toDelete.name);
        if (err2) throw err2;
      }
    } catch (e: any) {
      if (isNetworkError(e)) {
        console.warn('Network error caught in deleteIntegrado, adding to offline queue');
        const queue = JSON.parse(localStorage.getItem(OFFLINE_DELETE_INTEGRADO_QUEUE) || '[]');
        if (!queue.includes(toDelete.name)) {
            queue.push(toDelete.name);
            localStorage.setItem(OFFLINE_DELETE_INTEGRADO_QUEUE, JSON.stringify(queue));
        }
      } else {
        throw e;
      }
    }`;

content = content.replace(targetDeleteIntegrado, replaceDeleteIntegrado);


const targetDeleteVisit = `      } else {
        const { error } = await supabase.from('registros').delete().eq('id', id);
        if (error) throw error;
      }
    } catch (e: any) {
      throw e;
    }`;

const replaceDeleteVisit = `      } else {
        const { error } = await supabase.from('registros').delete().eq('id', id);
        if (error) throw error;
      }
    } catch (e: any) {
      if (isNetworkError(e)) {
        console.warn('Network error caught in deleteVisit, adding to offline queue');
        if (!id.toString().startsWith('v_') && !id.toString().startsWith('dummy_')) {
            const queue = JSON.parse(localStorage.getItem(OFFLINE_DELETE_VISIT_QUEUE) || '[]');
            if (!queue.includes(id)) {
                queue.push(id);
                localStorage.setItem(OFFLINE_DELETE_VISIT_QUEUE, JSON.stringify(queue));
            }
        }
      } else {
        throw e;
      }
    }`;

content = content.replace(targetDeleteVisit, replaceDeleteVisit);

fs.writeFileSync('src/lib/storage.ts', content);
console.log('Successfully patched delete operations');
