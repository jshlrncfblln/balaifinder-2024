


export default function Features(){
    return(
        <section class="mt-8">
            <div class="container max-w-xl p-6 mx-auto space-y-12 lg:px-8 lg:max-w-7xl">
                <div>
                <h2 class="text-3xl font-bold text-center sm:text-5xl">Balai<span className="text-sky-500">Finder's</span> Features</h2>
                <p class="max-w-3xl mx-auto mt-4 text-xl text-center text-gray-500">Explore BalaiFinder's features that enhance your searching experience and make it even more exciting.</p>
                </div>
                <div class="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                    <div class="mt-4 space-y-12">
                    <div class="flex">
                        <div class="flex-shrink-0">
                        <div class="flex items-center justify-center w-12 h-12 rounded-md dark:text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-rocket">
                            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z">
                            </path>
                            <path
                                d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z">
                            </path>
                            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                            </svg></div>
                        </div>
                        <div class="ml-4">
                        <h4 class="text-lg font-semibold leadi ">Advanced Matching Algorithms</h4>
                        <p class="mt-2 text-gray-600">Discover our improved matching algorithms that adapt to your preferences and provide even more personalized property suggestions.</p>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="flex-shrink-0">
                        <div class="flex items-center justify-center w-12 h-12 rounded-md dark-bg-emerald-400 dark-text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-bookmark-plus">
                            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                            <line x1="12" x2="12" y1="7" y2="13"></line>
                            <line x1="15" x2="9" y1="10" y2="10"></line>
                            </svg></div>
                        </div>
                        <div class="ml-4">
                        <h4 class="text-lg font-semibold leadi ">Variety of House Property</h4>
                        <p class="mt-2 text-gray-600">Access an extensive list of house property that suites in your ideal home.</p>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="flex-shrink-0">
                        <div class="flex items-center justify-center w-12 h-12 rounded-md dark-bg-emerald-400 dark-text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-file-question">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                            <path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"></path>
                            <path d="M12 17h.01"></path>
                            </svg></div>
                        </div>
                        <div class="ml-4">
                        <h4 class="text-lg font-semibold leadi ">Apply for your Ideal House Property</h4>
                        <p class="mt-2 text-gray-600">After finding your ideal home, what's the next step? Apply for it so your ideal home can be yours</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div aria-hidden="true" class="mt-10 lg:mt-0">
                    <img width="600" height="600" src="/assets/system-features.svg" class="mx-auto" />
                </div>
                </div>
            </div>
        </section>
    )
}