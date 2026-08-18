

 const defaultCodeSnippets: Record<string, string> = {
  javascript: `// JavaScript Example
console.log("Hello, World!");

// Calculate sum
const sum = (a, b) => a + b;
console.log("5 + 3 =", sum(5, 3));`,

  typescript: `// TypeScript Example
const greeting: string = "Hello, World!";
console.log(greeting);

// Function with types
function multiply(a: number, b: number): number {
  return a * b;
}

console.log("4 * 7 =", multiply(4, 7));`,

  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");

    return 0;
}`,
  cpp: `// C++ Example
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Simple calculation
    int sum = 5 + 3;
    cout << "5 + 3 = " << sum << endl;
    
    return 0;
}`,
  go: `// Go Example
package main

import "fmt"

func main() {
    // sample code
    fmt.Println("Hello, World!")

}
`,
};

export default defaultCodeSnippets;
