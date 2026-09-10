

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
  python: `# Python Example
print("Hello, World!")

# Calculate sum
def sum(a, b):
    return a + b

print(f"5 + 3 = {sum(5, 3)}")`,

  rust: `// Rust Example
fn main() {
    println!("Hello, World!");
    
    // Simple calculation
    let sum = 5 + 3;
    println!("5 + 3 = {}", sum);
}`,

  java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Simple calculation
        int sum = 5 + 3;
        System.out.println("5 + 3 = " + sum);
    }
}`
};

export default defaultCodeSnippets;
