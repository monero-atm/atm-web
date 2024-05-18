# Adding a new language
1. Create a new file with the name according to the `ISO 639-1` and write the translations as shown in the example:
![image](https://github.com/monero-atm/atm-web/assets/82507565/fc2b828e-c1e9-4539-837b-cead9e344770)
2. Import the new added language to the language and add it to the translations object as shown in the example:
![image](https://github.com/monero-atm/atm-web/assets/82507565/36f31be7-dcdb-45ad-8ec7-16b422b0fbfe)
3. Add the new language to the selection/list. 
```typescript
Before Lithuanian was added:
const flags: Record<string, string> = {
  en: 'fi fi-gb',
  cz: 'fi fi-cz',
}

After lithuanian was added:
const flags: Record<string, string> = {
  en: 'fi fi-gb',
  cz: 'fi fi-cz',
  lt: 'fi fi-lt'
}
```
![image](https://github.com/monero-atm/atm-web/assets/82507565/11ad6706-6063-47db-a8bc-23caa6cd5bc2)

## It is curicial to follow `ISO 639-1` standarts, for ease of management and implementation.
