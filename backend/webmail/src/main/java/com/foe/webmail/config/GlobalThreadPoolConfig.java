package com.foe.webmail.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
public class GlobalThreadPoolConfig {

    @Value("${thread.pool.core-size:10}")
    private int corePoolSize;

    @Value("${thread.pool.max-size:50}")
    private int maxPoolSize;

    @Value("${thread.pool.queue-capacity:500}")
    private int queueCapacity;

    @Bean("asyncExecutor")
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.setThreadNamePrefix("GlobalThread-");
        executor.initialize();
        return executor;
    }

}
